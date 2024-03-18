import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '@/api'
import type { signinPayload } from '@/types/auth';

import { db } from '@/main';
import { doc, setDoc } from 'firebase/firestore'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref({
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
    })  
    const error = ref('');
    const loader = ref(false);

    // Authentification
    const auth = async (payload: signinPayload, type: string) => {
        const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'

        error.value = '';
        loader.value = true;

        try {
            const res = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
                ...payload,
                returnSecureToken: true,
            })

            // если res != ошибка
            if (res.data) {
                userInfo.value = {
                    token: res.data?.idToken,
                    email: res.data?.email,
                    userId: res.data?.localId,
                    refreshToken: res.data?.refreshToken,
                }
                
                if (type === 'signup') {
                    await setDoc(doc(db, "users", res.data?.localId), {
                        id: res.data?.localId,
                        nickname: '',
                        room: ''
                    });
                }
                
                localStorage.setItem('userTokens', JSON.stringify(
                    { 
                        token: userInfo.value.token, 
                        refreshToken: userInfo.value.refreshToken,
                        userId: userInfo.value.userId, 
                    }
                ))
            }
            // если res = ошибка
            else {
                switch (res.response.data.error.message) {
                    case 'EMAIL_EXISTS':
                    error.value = 'Такая почта уже существует'
                    break;
    
                    case 'OPERATION_NOT_ALLOWED':
                    error.value = 'Данная операция не поддерживается'
                    break;
    
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    error.value = 'Слишком много попыток, попробуйте позже'
                    break;
    
                    case 'EMAIL_NOT_FOUND':
                    error.value = 'Такой Email не зарегистрирован'
                    break;
    
                    case 'INVALID_PASSWORD':
                    error.value = 'Неверный пароль'
                    break;
    
                    case 'INVALID_EMAIL':
                    error.value = 'Неверный Email'
                    break;
    
                    case 'INVALID_LOGIN_CREDENTIALS':
                    error.value = 'Неверный Email или пароль'
                    break;
    
                    default:
                    error.value = 'Ошибка'
                    break;
                }
            }
        } finally {
            loader.value = false;
        }
    }

    // Logout
    const logout = () => {
        userInfo.value = {
            token: '',
            email: '',
            userId: '',
            refreshToken: '',
        }
    }

    return {
        userInfo,
        error,
        loader,
        auth,
        logout,
    }
})
