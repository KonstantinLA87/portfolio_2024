<template>
    <main>
        <h1>База данных</h1>
        <LoaderSpinner v-if="databaseStore.loader" />
        <div v-else class="flex flex-column gap-3">
            <DataTable :value="carsArray" stripedRows class="mb-6" paginator :rows="5">
                <Column sortable field="company" header="Производитель" style="width: 25%" />
                <Column sortable field="model" header="Модель" style="width: 30%" />
                <Column sortable field="type" header="Тип" style="width: 20%" />
                <Column sortable field="price" header="Цена ($)" style="width: 15%" />
                <Column style="width: 10%" />
                <Column>
                    <template #body="slotProps">
                        <i class="pi pi-times database__table-remove" @click="removeCar(slotProps.data.id)"></i>
                    </template>
                </Column>
                <template #footer> Всего в базе данных {{ carsArray ? Object.keys(carsArray).length : 0 }} машин. </template>
            </DataTable>

            <form class="form database__form" @submit.prevent="addNewCar(carCompanyName, carModelName, carType, carPrice)">
                <h2>Добавить машину</h2>
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
                        <Dropdown id="type" v-model="carType" :options="carTypes" />
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
import { getDatabase, ref as firebaseRef, push, set, remove, update } from 'firebase/database'

import LoaderSpinner from '@/components/LoaderSpinner.vue'
import Message from 'primevue/message'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import FloatLabel from 'primevue/floatlabel'

import { CarTypes, type CarType, type Car } from '@/types/database'
import { useDatabaseStore } from '@/stores/database'

const databaseStore = useDatabaseStore()

const carsArray = ref<Car[]>()
const carsBeforeConvertToArray = ref<Car[]>()
const carCompanyName = ref('')
const carModelName = ref('')
const carType = ref<CarType>(CarTypes.SEDAN)
const carTypes = ref<CarType[]>([CarTypes.SEDAN, CarTypes.CUPE, CarTypes.SPORT, CarTypes.SUVS, CarTypes.UNIVERSAL])
const carPrice = ref(0)

const updateData = async () => {
    await databaseStore.getAllCars()
    carsArray.value = Object.values(databaseStore.cars)
    carsBeforeConvertToArray.value = databaseStore.cars
}

const addNewCar = async (company: string, model: string, type: CarType, price: number) => {
    const db = getDatabase()

    const postData = {
        company,
        model,
        type,
        price
    }

    // создаем новый пустой объект + получаем его id
    const newItemKey = await push(firebaseRef(db, 'cars')).key

    // updates = {
    //      /cars/id: {...}
    // }
    const updates = {}
    updates['/cars/' + newItemKey] = { ...postData, id: newItemKey }

    await update(firebaseRef(db), updates)

    carCompanyName.value = ''
    carModelName.value = ''
    carType.value = CarTypes.SEDAN
    carPrice.value = 0

    updateData()
}

const removeCar = async (Carid: string) => {
    const db = getDatabase()
    await remove(firebaseRef(db, `cars/${Carid}`))

    updateData()
}

onMounted(() => {
    updateData()
})
</script>
