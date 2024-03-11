<template>
    <main>
        <h1>Машины</h1>
        <LoaderSpinner v-if="databaseStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <div
                v-for="(carsGroup, i) in cars" 
                :key="i"
                class="database__group"
            >
                <h2>{{ carsGroup.company }}</h2>
                <Card v-for="car in carsGroup.items" :key="car.name">
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
// import axiosApiInstance from '@/api'
import type { CarsCompany } from '@/types/database';
import { useDatabaseStore } from '@/stores/database';

const databaseStore = useDatabaseStore()

const cars = ref<CarsCompany[]>()

onMounted( async () => {
    await databaseStore.getAllCards()
    cars.value = databaseStore.cars
})
</script>
