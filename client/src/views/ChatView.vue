<template>
    <div>
        <div>
            <p>{{ currentRoom }}</p>
            <span>Users</span>
            <ul>
                <li v-for="user in users" :key="user.id">{{ user.username }}</li>
            </ul>
        </div>
        <div>
            <h2>Chats</h2>
            <div>
                <div v-for="(chat, i) in chats" :key="i">
                    <span class="name">{{ chat.username }}: </span>
                    <span>{{ chat.text }} </span>
                    <span> {{ chat.time }}</span>
                </div>
            </div>
        </div>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="message">
            <button type="submit">SEND</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { io, type Socket } from "socket.io-client"
import { type User, type Chat } from '@/types/chat'

const route = useRoute()
const router = useRouter()

const message = ref("")
const chats = ref<Chat[]>([])
const users = ref<User[]>([])
const currentRoom = ref("")
const socket = ref<Socket>()

const onSubmit = async () => {
    socket.value?.emit("chatMessage", message.value)
    await nextTick(() => (message.value = ""))
}

onMounted(() => {
    socket.value = io("http://localhost:4000")
    const { username, room } = route.query as Partial<Chat>

    if (!username || !room) {
        router.push("/");
    }

    socket.value?.emit("joinRoom", { username, room })

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
