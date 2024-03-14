<template>
    <div class="flex">
        <FloatLabel>
            <slot />
            <label>{{ props.label }}</label>
        </FloatLabel>
        <Button
            class="invisible ml-3"
            @click="props.onClick"
            :class="{
                active: isShowBtn
            }"
            >Сохранить</Button
        >
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'

interface Props {
    some: string
    valueOrigin: string
    label: string
    onClick: () => void
}
const props = defineProps<Props>()

const isShowBtn = ref(false)

watch(
    () => [props.some, props.valueOrigin],
    ([some, valueOrigin]) => {
        if (some !== valueOrigin) {
            isShowBtn.value = true
        } else {
            isShowBtn.value = false
        }
    }
)
</script>
