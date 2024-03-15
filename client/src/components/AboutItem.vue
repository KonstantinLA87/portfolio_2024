<template>  
    <RouterLink 
        class="about__item" 
        :to="props.to" 
        :class="{
            yellow: props.color === AboutItemColor.YELLOW,
            green: props.color === AboutItemColor.GREEN,
            blue: props.color === AboutItemColor.BLUE,
            disabled: authStore.userInfo.token && props.to === Router.SIGNIN
        }"
    >
        <slot />
        <p class="about__item-title">{{ props.title }}</p>
        <p>{{ props.text }}</p>
    </RouterLink>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

import { AboutItemColor, type AboutItemColorType } from '@/types/components';
import { Router, type RouterType } from '@/types/router';

interface Props {
    title: string
    text: string
    color: AboutItemColorType
    to: RouterType
}
const props = defineProps<Props>()

const authStore = useAuthStore()

</script>