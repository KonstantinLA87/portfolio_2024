<template>
    <div class="container">
        <div class="nav">
            <RouterLink class="nav__link" to="/">Главная</RouterLink>
            <RouterLink class="nav__link" to="/signin" v-if="!token">Вход</RouterLink>
            <RouterLink class="nav__link" to="/database" v-if="token">База данных</RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const userCheck = () => {
    const tokens = JSON.parse(localStorage.getItem('userTokens'))

    if (tokens) {
        authStore.userInfo.token = tokens.token
        authStore.userInfo.refreshToken = tokens.refreshToken
        authStore.userInfo.expiresIn = tokens.expiresIn
    }
    console.log('userInfo', authStore.userInfo)
}

const token = computed(() => authStore.userInfo.token)

userCheck()
</script>

<style scoped></style>
