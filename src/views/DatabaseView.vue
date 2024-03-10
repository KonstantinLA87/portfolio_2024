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
import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import axiosApiInstance from '@/api'
import type { Car } from '@/types/database';

const cars = ref<Car[][]>()
const showLoader = ref(false)

const getAllCards = async () => {
    showLoader.value = true
    try {
        const { data } = await axiosApiInstance.get<Car[][]>(`https://portfolio-2024-397ea-default-rtdb.europe-west1.firebasedatabase.app/cars.json`)

        cars.value = data
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
