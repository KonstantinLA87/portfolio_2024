<template>
    <div>
        <h1>Главная</h1>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="username" />
            <select name="" id="" v-model="room">
                <option :value="room" v-for="(room, index) in rooms" :key="index">{{ room }}</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rooms = ['first', 'second'];
const username = ref();
const room = ref(rooms[0]);

const onSubmit = () => {
    router.push(`/chat?username=${username.value}&room=${room.value}`)
}
</script>
