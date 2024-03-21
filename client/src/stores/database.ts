import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CarsCompany } from '@/types/database';
import axiosApiInstance from '@/api';

export const useDatabaseStore = defineStore('database', () => {
    const cars = ref<CarsCompany[]>()
    const loader = ref(false)

    const getAllCars = async () => {
        loader.value = true
        try {
            const { data } = await axiosApiInstance.get<CarsCompany[]>(`https://portfolio-2024-397ea-default-rtdb.europe-west1.firebasedatabase.app/cars.json`)

            cars.value = data
        } catch (error) {
            console.log(error)
        } finally {
            loader.value = false
        }
    }

    return {
        cars,
        loader,
        getAllCars,
    }
})
