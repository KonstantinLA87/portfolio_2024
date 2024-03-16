<template>
    <h1>Профиль</h1>
    
    <!-- CHAT -->
    <ProfileItem title="Чат">
        <!-- Left -->
        <template v-slot:left>
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
        </template>
        <!-- Note -->
        <template v-slot:note>
            <p>Никнейм обяззателен, чтобы войти в чат. Вы будете видеть только тех пользователей, которые находятся с вами в одной комнате.</p>
            <p>Чат сделан с использованием технологии Websockets. Пока данные затираются при преходе на другие вкладки, но в дальнейшем я собираюсь исправить этот функционал и сохранять переписку в комнатах на локальном бэке используя Node.js</p>
        </template>
    </ProfileItem>
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
import ProfileItem from '@/components/ProfileItem.vue'

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
