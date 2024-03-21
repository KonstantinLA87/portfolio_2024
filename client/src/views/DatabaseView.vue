<template>
    <main>
        <h1>База данных</h1>
        <LoaderSpinner v-if="databaseStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <Message severity="warn mb-6">
                ВАЖНО: Если вы видите это сообщение, значит данный раздел пока что находится на стадии разработки. Сейчас из реализованного функционала только подтягивание данных с сервера Firebase. В ближайшие дни я хочу оформить эти данные и сделать возможность добавлять/удалять/редактировать данные.
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
            <form @submit="onSubmit">
                <InputText id="company" placeholder="Название компании-производителя" v-model="carCompanyName" />
                <InputText id="carModelName" placeholder="Название модели" v-model="carModelName" />
                <Dropdown 
                    v-model="carType"
                    :options="carTypes"
                />
                <Button type="submit">Test</Button>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDatabase, ref as firebaseRef, push, set } from "firebase/database";

import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Message from 'primevue/message'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import { CarTypes, type CarType, type CarsCompany } from '@/types/database';
import { useDatabaseStore } from '@/stores/database';

const databaseStore = useDatabaseStore()

const cars = ref<CarsCompany[]>()
const carCompanyName = ref('')
const carModelName = ref('')
const carType = ref<CarType>(CarTypes.SEDAN)
const carTypes = ref<CarType[]>([
    CarTypes.SEDAN,
    CarTypes.CUPE,
    CarTypes.SPORT,
    CarTypes.SUVS,
]) 

const onSubmit = () => {
    const db = getDatabase();
    push(firebaseRef(db, 'cars'), {
        company: carCompanyName.value,
        items: {
            [some]: {
                name: carModelName.value,
                type: carType.value,
            }
        },
        // company: carCompanyName.value,
        // items: {
        //     some: {
        //         name: carModelName.value,
        //         type: carType.value,
        //     }
        // }
    });
}

onMounted( async () => {
    await databaseStore.getAllCars()
    cars.value = databaseStore.cars
})
</script>
