<template>
    <h2>Sign Up</h2>
    <form class="flex flex-column gap-3" action="">
        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
            <InputText 
                type="mail" 
                placeholder="Your Email" 
                v-model="email"
            />
        </div>

        <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText 
                type="password" 
                placeholder="Enter password" 
                v-model="password"
            />
        </div>

        <div class="flex flex-column gap-3">
            <Button label="Sign up" @click="signup" />
            <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const email = ref('');
const password = ref('');

const signup = async () => {

}
</script>

<style scoped></style>
