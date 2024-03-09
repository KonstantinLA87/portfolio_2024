<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="container">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/database">База данных</RouterLink>
        <RouterLink to="/signin">Вход</RouterLink>
        <RouterView />
    </div>
</template>

<style scoped></style>
