import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import SigninView from '@/views/SigninView.vue'
import DatabaseView from '@/views/DatabaseView.vue'
import ChatView from '@/views/ChatView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
            meta: {
                auth: false,
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: SigninView,
            meta: {
                auth: false,
            }
        },
        {
            path: '/database',
            name: 'database',
            component: DatabaseView,
            meta: {
                auth: true,
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatView,
            meta: {
                auth: true,
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                auth: true,
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.auth && !authStore.userInfo.token) { 
        next('/signin')
    } 
    else if (to.meta.auth === false && authStore.userInfo.token) {
        next('/database')
    } else {
        next()
    }
})

export default router
