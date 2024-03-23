<template>
    <main>
        <h1>База данных</h1>
        <LoaderSpinner v-if="databaseStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <Message severity="warn">
                ВАЖНО: Реализован функционал вывода/добавления данных. В ближайшие будет добавлен функционал удаления/редактирования.
            </Message>
            <DataTable :value="cars" stripedRows>
                <Column sortable field="company" header="Производитель" style="width: 25%" />
                <Column sortable field="model" header="Модель" style="width: 30%" />
                <Column sortable field="type" header="Тип" style="width: 20%" />
                <Column sortable field="price" header="Цена ($)" style="width: 15%" />
                <Column style="width: 10%" />
                <template #footer> Всего в базе данных {{ cars ? Object.keys(cars).length : 0 }} машин. </template>
            </DataTable>

            <form class="form database__form" @submit.prevent="addNewCar">
                <h2>Добавить строку</h2>
                <div class="database__form-wrap">
                    <FloatLabel>
                        <InputText id="company" v-model="carCompanyName" />
                        <label for="company">Производитель</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="model" v-model="carModelName" />
                        <label for="model">Модель</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Dropdown 
                            id="type"
                            v-model="carType"
                            :options="carTypes"
                        />
                        <label for="type">Тип</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputNumber id="price" v-model="carPrice" />
                        <label for="price">Цена в долларах США</label>
                    </FloatLabel>
                </div>
                <Button class="big" type="submit" :disabled="!carCompanyName || !carModelName">Сохранить</Button>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDatabase, ref as firebaseRef, push, set } from "firebase/database";

import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Message from 'primevue/message'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FloatLabel from 'primevue/floatlabel';

import { CarTypes, type CarType, type Car } from '@/types/database';
import { useDatabaseStore } from '@/stores/database';


const databaseStore = useDatabaseStore()

// TODO ИЗМЕНИТЬ ТИП ДАННЫХ ДЛЯ МАШИН
const cars = ref<Car[]>()
const carCompanyName = ref('')
const carModelName = ref('')
const carType = ref<CarType>(CarTypes.SEDAN)
const carTypes = ref<CarType[]>([
    CarTypes.SEDAN,
    CarTypes.CUPE,
    CarTypes.SPORT,
    CarTypes.SUVS,
]) 
const carPrice = ref(0)

const addNewCar = async () => {
    const db = getDatabase();
    await push(firebaseRef(db, 'cars'), {
        company: carCompanyName.value,
        model: carModelName.value,
        type: carType.value,
        price: carPrice.value,
    });

    carCompanyName.value = ''
    carModelName.value = ''
    carType.value = CarTypes.SEDAN
    carPrice.value = 0

    await databaseStore.getAllCars()
    cars.value = Object.values(databaseStore.cars)
}

onMounted( async () => {
    await databaseStore.getAllCars()
    cars.value = Object.values(databaseStore.cars)
})
</script>
