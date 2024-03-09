import axios from 'axios'
import { useAuthStore } from './stores/auth'

axios.interceptors.request.use((config) => {
        const authStore = useAuthStore()
        const params = new URLSearchParams()
        params.append('auth', authStore.userInfo.token)
        config.params = params

        return config
    }
)
