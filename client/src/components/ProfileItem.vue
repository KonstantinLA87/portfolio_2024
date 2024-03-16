<template>  
    <div class="profile__item">
        <h3 class="profile__item-title">{{ props.title }}</h3>
        <div class="profile__item-content">
            <div class="profile__item-left">
                <slot name="left" />
            </div>
            <div class="profile__item-right">
                <i class="profile__item-info-icon pi pi-info-circle"></i>
                <div class="profile__item-note">
                    <slot name="note"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
}
const props = defineProps<Props>()
</script>