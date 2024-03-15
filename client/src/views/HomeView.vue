<template>
    <h1>О проекте</h1>
    <p class="mb-5">Это проект является моим портфолио и одновременно песочницей, где я тестирую различные, новые для меня, технологии.</p>
    <h2>Из чего состоит проект на данный момент</h2>
    <div class="about__wrap">
        <!-- auth -->
        <AboutItem
            title="Аутентификация"
            text="Реализована с применением Firebase Authentication"
            :to="Router.SIGNIN"
            :color="AboutItemColor.GREEN"
        >
            <AuthImg />
        </AboutItem>
        <!-- chat -->
        <AboutItem
            title="Чат"
            text="Технологии Websocket's и локальный бэк"
            :to="Router.CHAT"
            :color="AboutItemColor.BLUE"
        >
            <ChatImg />
        </AboutItem>
        <!-- database -->
        <AboutItem
            title="База данных"
            text="Firebase Realtime Database"
            :to="Router.DATABASE"
            :color="AboutItemColor.YELLOW"
        >
            <DatabaseImg />
        </AboutItem>
    </div>
</template>

<script setup lang="ts">
import { AboutItemColor } from '@/types/components';
import AuthImg from '../assets/img/auth.svg'
import ChatImg from '../assets/img/chat.svg'
import DatabaseImg from '../assets/img/database.svg'

import AboutItem from '@/components/AboutItem.vue';
import { Router } from '@/types/router';
</script>
