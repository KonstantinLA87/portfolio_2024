<template>
    <div class="container">
        <div class="nav">
            <RouterLink class="nav__link" to="/">Главная</RouterLink>
            <RouterLink class="nav__link" to="/signin" v-if="!token">Вход</RouterLink>
            <RouterLink class="nav__link" to="/database" v-if="token">База данных</RouterLink>
            <RouterLink class="nav__link" to="/logout" v-if="token" @click.prevent="logout">Выход</RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import router from './router'

const authStore = useAuthStore()

const userCheck = () => {
    const tokens = JSON.parse(localStorage.getItem('userTokens') || '""')

    if (tokens) {
        authStore.userInfo.token = tokens.token
        authStore.userInfo.refreshToken = tokens.refreshToken
    }
}

const token = computed(() => authStore.userInfo.token)

userCheck()

const logout = () => {
    authStore.logout()
    localStorage.removeItem('userTokens')
    router.push('/')
}
</script>

<style scoped></style>
