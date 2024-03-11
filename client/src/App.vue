<template>
    <div class="container">
        <div class="nav">
            <div class="nav__left">
                <RouterLink class="nav__link" to="/">
                    <i class="pi pi-home"></i>
                    Главная
                </RouterLink>
                <RouterLink class="nav__link" to="/database" v-if="token">
                    <i class="pi pi-database"></i>
                    <span>База данных</span>
                </RouterLink>
                <RouterLink class="nav__link" to="/chat" v-if="token">
                    <i class="pi pi-megaphone"></i>
                    <span>Чат</span>
                </RouterLink>
            </div>
            <div class="nav__right">
                <RouterLink class="nav__link" to="/logout" v-if="token" @click.prevent="logout">
                    <span>Выход</span>
                    <i class="pi pi-sign-out"></i>
                </RouterLink>
                <RouterLink class="nav__link" to="/signin" v-if="!token">
                    <span>Вход</span>
                    <i class="pi pi-sign-in"></i>
                </RouterLink>
            </div>
        </div>
        <CommonCard>
            <RouterView />
        </CommonCard>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import router from './router'
import CommonCard from './components/CommonCard.vue'

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
