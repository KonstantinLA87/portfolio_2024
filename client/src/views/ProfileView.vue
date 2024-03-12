<template>
    <h1>Профиль</h1>
    <div class="profile__inputs-wrap">
        <FloatLabel>
            <InputText id="username" v-model="nickname" />
            <label for="username">Никнейм в чате</label>
            <Button @click="saveNickname">Сохранить</Button>
        </FloatLabel>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { db } from '@/main'
import { collection, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const authStore = useAuthStore()

const nickname = ref('')

const saveNickname = async () => {
    await updateDoc(doc(db, 'users', authStore.userInfo.userId), {
        nickname: nickname.value
    })
}

onMounted(async () => { 
    const docRef = doc(db, 'users', authStore.userInfo.userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        nickname.value = docSnap.data().nickname
    } else {
        console.log('No such document!')
    }
})
</script>
