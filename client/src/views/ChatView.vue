<template>
    <div>
        <h1 class="chat__title">Чат</h1>
        <span class="chat__title-room">{{ currentRoom }}</span>
        <div class="chat__wrap">
            <div class="chat__users">
                <span class="chat__users-title">Пользователи:</span>
                <ul class="chat__users-list">
                    <li
                        v-for="user in users"
                        class="chat__users-item"
                        :class="{
                            'chat__users-item--owner': user.username === currentUser
                        }"
                        :key="user.id"
                    >
                        {{ user.username }}
                    </li>
                </ul>
            </div>
            <div class="chat__right">
                <div class="chat__chat">
                    <div
                        v-for="(chat, i) in chats"
                        class="chat__chat-message-wrap"
                        :key="i"
                        :class="{
                            'chat__chat-message-wrap--owner': chat.username === currentUser,
                            'chat__chat-message-wrap--admin': chat.username === 'Vue Chatapp Admin'
                        }"
                    >
                        <div class="chat__chat-message">
                            <span
                                class="chat__chat-username"
                                :class="{
                                    hiden: chat.username === currentUser || chat.username === 'Vue Chatapp Admin'
                                }"
                                >{{ chat.username }}:
                            </span>
                            <span class="chat__chat-text">{{ chat.text }} </span>
                            <span class="chat__chat-time"> {{ chat.time }}</span>
                        </div>
                    </div>
                </div>
                <form class="chat__input-wrap" @submit.prevent="onSubmit">
                    <InputText class="chat__input mid" type="text" v-model="message" placeholder="Введите сообщение" />
                    <Button type="submit">Отправить</Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { io, type Socket } from 'socket.io-client'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/main'
import { useAuthStore } from '@/stores/auth'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { type User, type Chat } from '@/types/chat'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

const message = ref('')
const chats = ref<Chat[]>([])
const users = ref<User[]>([])
const currentRoom = ref('')
const currentUser = ref('')
const socket = ref<Socket>()

const onSubmit = async () => {
    socket.value?.emit('chatMessage', message.value)
    await nextTick(() => (message.value = ''))
}

onMounted(async () => {
    const docRef = doc(db, 'users', authStore.userInfo.userId)
    const docSnap = await getDoc(docRef)

    // WEBSOCKETS
    socket.value = io('http://localhost:4000')
    const username = docSnap.data()?.nickname
    currentUser.value = docSnap.data()?.nickname
    const room = docSnap.data()?.room

    if (!username || !room) {
        router.push('/profile')
    }

    socket.value?.emit('joinRoom', { username, room })

    socket.value?.on('message', (message: Chat) => {
        chats.value.push(message)
    })

    socket.value?.on('roomUsers', (roomUsers) => {
        users.value = roomUsers.users
        currentRoom.value = roomUsers.room
    })
})

onBeforeUnmount(() => {
    socket.value?.disconnect()
})
</script>
