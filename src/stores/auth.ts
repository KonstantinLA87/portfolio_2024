import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '@/api'
import type { signinPayload } from '@/types/auth';

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
            const { data } = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
                ...payload,
                returnSecureToken: true,
            })
            userInfo.value = {
                token: data.idToken,
                email: data.email,
                userId: data.userId,
                refreshToken: data.refreshToken,
            }
            localStorage.setItem('userTokens', JSON.stringify(
                { 
                    token: userInfo.value.token, 
                    refreshToken: userInfo.value.refreshToken,
                }
            ))
        } catch (err) {
            switch (err.response.data.error.message) {
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
                error.value = 'Не верный пароль'
                break;

                default:
                error.value = 'Ошибка'
                break;
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
