<template>
    <main>
        <h1>База данных</h1>
        <LoaderSpinner v-if="databaseStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <Message severity="warn mb-6">
                ВАЖНО: Если вы видите это сообщение, значит данный раздел пока что еще находится на стадии разработки. Сейчас реализован функционал просто подтягивания данных с сервера Firebase. В ближашие дни я хочу оформить эти данные и сделать возможность добавлять/удалять/редактировать данные.
            </Message>
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
import { onMounted, ref } from 'vue'

import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Message from 'primevue/message'
import Card from 'primevue/card'

import type { CarsCompany } from '@/types/database';
import { useDatabaseStore } from '@/stores/database';

const databaseStore = useDatabaseStore()

const cars = ref<CarsCompany[]>()

onMounted( async () => {
    await databaseStore.getAllCards()
    cars.value = databaseStore.cars
})
</script>
