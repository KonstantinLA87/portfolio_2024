<template>
    <main>
        <h1>Машины</h1>
        <LoaderSpinner v-if="showLoader" />
        <div v-else class="flex flex-column gap-3">
            <div v-for="(carsGroup, i) in cars" :key="i">
                <Card v-for="car in carsGroup" :key="car.name">
                    <template #title> {{ car.name }} </template>
                    <template #subtitle> {{ car.type }} </template>
                </Card>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import axiosApiInstance from '@/api'

const authStore = useAuthStore()

const cars = ref()
const showLoader = ref(false)

const getAllCards = async () => {
    showLoader.value = true
    try {
        const response = await axiosApiInstance.get(`https://portfolio-2024-397ea-default-rtdb.europe-west1.firebasedatabase.app/cars.json`)
        cars.value = response.data
    } catch (error) {
        console.log(error.response)
    } finally {
        showLoader.value = false
    }
}

onMounted(() => {
    getAllCards()
})
</script>
