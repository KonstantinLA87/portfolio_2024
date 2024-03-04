import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

const firebaseConfig = {
    apiKey: "AIzaSyBgRCuMmoQfLdmEFu2lD-9tXTEq03tShsM",
    authDomain: "portfolio-2024-397ea.firebaseapp.com",
    projectId: "portfolio-2024-397ea",
    storageBucket: "portfolio-2024-397ea.appspot.com",
    messagingSenderId: "487296298581",
    appId: "1:487296298581:web:5242c12b217c5cfb796edc"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')






