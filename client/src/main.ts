import './assets/scss/main.scss'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import PrimeVue from 'primevue/config';
import './api'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyBgRCuMmoQfLdmEFu2lD-9tXTEq03tShsM",
    authDomain: "portfolio-2024-397ea.firebaseapp.com",
    projectId: "portfolio-2024-397ea",
    storageBucket: "portfolio-2024-397ea.appspot.com",
    messagingSenderId: "487296298581",
    appId: "1:487296298581:web:5242c12b217c5cfb796edc",

    databaseURL: "https://portfolio-2024-397ea-default-rtdb.europe-west1.firebasedatabase.app",
};

const initFirebase = initializeApp(firebaseConfig)
export const db = getFirestore(initFirebase)
export const database = getDatabase(initFirebase);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')






