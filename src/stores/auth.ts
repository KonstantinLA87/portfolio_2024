import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const apiKey = 'AIzaSyBgRCuMmoQfLdmEFu2lD-9tXTEq03tShsM';

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

  const signup = async (payload) => {
    error.value = '';
    loader.value = true;

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
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
      console.log(response.data);
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
    signup, 
  }
})
