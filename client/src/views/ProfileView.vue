<template>
    <h1>Профиль</h1>
    <div class="profile__wrap">
        <InvisibleSaveBtn 
            label="Никнейм"
            :some="nickname"
            :valueOrigin="nicknameOrigin"
            :onClick="saveNickname"
        >
            <InputText 
                v-model="nickname"
            />
        </InvisibleSaveBtn>
        <InvisibleSaveBtn 
            label="Выберите чат"
            :some="room"
            :valueOrigin="roomOrigin"
            :onClick="saveRoom"
        >
            <Dropdown 
                v-model="room"
                :options="rooms"
            />
        </InvisibleSaveBtn>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { db } from '@/main'
import {doc, updateDoc, getDoc } from 'firebase/firestore'

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InvisibleSaveBtn from '@/components/InvisibleSaveBtn.vue'

import { RoomType, type Room } from '@/types/chat';

const authStore = useAuthStore()

const nickname = ref('')
const nicknameOrigin = ref('')

const room = ref<Room>(RoomType.FIRST)
const roomOrigin = ref<Room>(RoomType.FIRST)
const rooms = ref<Room[]>([RoomType.FIRST, RoomType.SECOND])

const saveNickname = async () => {
    await updateDoc(doc(db, 'users', authStore.userInfo.userId), {
        nickname: nickname.value
    })
    nicknameOrigin.value = nickname.value
}

const saveRoom = async () => {
    await updateDoc(doc(db, 'users', authStore.userInfo.userId), {
        room: room.value
    })
    roomOrigin.value = room.value
}

onMounted(async () => { 
    const docRef = doc(db, 'users', authStore.userInfo.userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        nickname.value = docSnap.data().nickname
        nicknameOrigin.value = docSnap.data().nickname

        room.value = docSnap.data().room
        roomOrigin.value = docSnap.data().room
    } else {
        console.log('No such document!')
    }
})
</script>
