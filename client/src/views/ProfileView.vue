<template>
    <h1>Профиль</h1>
    <div class="profile__inputs-wrap">
        <InputWithInvisibleBtn 
            label="Никнейм в чате" 
            v-model="nickname" 
            :valueOrigin="nicknameOrigin"
            :onClick="saveNickname" 
        />
        <InputWithInvisibleBtn 
            label="Комната в чате" 
            v-model="room" 
            :valueOrigin="roomOrigin"
            :onClick="saveRoom" 
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { db } from '@/main'
import {doc, updateDoc, getDoc } from 'firebase/firestore'

import InputWithInvisibleBtn from '@/components/InputWithInvisibleBtn.vue'

const authStore = useAuthStore()

const nickname = ref('')
const nicknameOrigin = ref('')

const room = ref('')
const roomOrigin = ref('')

const saveNickname = async () => {
    await updateDoc(doc(db, 'users', authStore.userInfo.userId), {
        nickname: nickname.value
    })
}

const saveRoom = async () => {
    await updateDoc(doc(db, 'users', authStore.userInfo.userId), {
        room: room.value
    })
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
