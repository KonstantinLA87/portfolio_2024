import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router';
import type { Token } from './types/auth';

const axiosApiInstance = axios.create()

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

axiosApiInstance.interceptors.request.use((config) => {
    const url = config.url
    if (!url?.includes('signInWithPassword') && !url?.includes('signUp')) {
        const authStore = useAuthStore()
        const params = new URLSearchParams()
        params.append('auth', authStore.userInfo.token)
        config.params = params
    }

    return config
})

axiosApiInstance.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const authStore = useAuthStore()
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const { data } = await axios.post<Token>(
                    `https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
                        grant_type: 'refresh_token',
                        refresh_token: JSON.parse(localStorage.getItem('userTokens') as string).refreshToken
                    }
                )
                authStore.userInfo.token = data.access_token
                authStore.userInfo.refreshToken = data.refresh_token

                localStorage.setItem('userTokens', JSON.stringify({
                    token: data.access_token, 
                    refreshToken: data.refresh_token,
                }))
                
            } catch (error) {
                localStorage.removeItem('userTokens')
                router.push('/signin')
                authStore.userInfo.token = ''
                authStore.userInfo.refreshToken = ''
            }
        }
    }
)

export default axiosApiInstance
