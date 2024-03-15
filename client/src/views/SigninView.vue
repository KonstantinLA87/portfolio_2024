<template>
    <div class="form-wrap">
        <h1>Войти</h1>
        <form class="flex flex-column gap-3" action="">
            <Message v-if="authStore.error" severity="warn">
                {{ authStore.error }}
            </Message>
    
            <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <InputText class="big" type="mail" placeholder="Ваш вымышленный email" v-model="email" />
            </div>
    
            <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-at"></i>
                </span>
                <InputText class="big" type="password" placeholder="Введите пароль" v-model="password" />
            </div>
    
            <LoaderSpinner v-if="authStore.loader" />
            <div v-else class="flex flex-column gap-3">
                <Button class="big" label="Войти" @click="signin" />
                <span>Вы еще не зарегистрированы? <RouterLink to="/signup">Регистрация</RouterLink></span>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import LoaderSpinner from '@/components/LoaderSpinner.vue'

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import { getAuth, onAuthStateChanged } from "firebase/auth";

const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const router = useRouter();

const signin = async () => {
    await authStore.auth({
            email: email.value,
            password: password.value
        },
        'signin'
    )

    router.push('/database')
}
</script>

<style scoped></style>
