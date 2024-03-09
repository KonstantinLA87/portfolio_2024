<template>
    <h2>Sign In</h2>
    <form class="flex flex-column gap-3" action="">
        <Message v-if="authStore.error" severity="warn">
            {{ authStore.error }}
        </Message>

        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
            <InputText type="mail" placeholder="Your Email" v-model="email" />
        </div>

        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText type="password" placeholder="Enter password" v-model="password" />
        </div>

        <LoaderSpinner v-if="authStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <Button label="Sign In" @click="signin" />
            <span>Вы еще не зарегистрированы? <router-link to="/signup">Sign up</router-link></span>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import LoaderSpinner from '@/components/LoaderSpinner.vue'

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

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
