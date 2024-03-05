import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useRouter } from 'vue-router';

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
  })

  const error = ref('');
  const loader = ref(false);

  const router = useRouter();

  const auth = async (payload, type: string) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'

    error.value = '';
    loader.value = true;

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true,
      })

      userInfo.value = {
        token: response.data.idtoken,
        email: response.data.email,
        userId: response.data.userId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }

      router.push('/about')

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

  return { 
    userInfo,
    error,
    loader,
    auth, 
  }
})
