<template>
    <FloatLabel>
        <InputText id="username" :value="props.modelValue" @input="handlerInputChange" />
        <label for="username">{{ props.label }}</label>
        <Button
            class="invisible ml-3"
            @click="onClick"
            :class="{
                active: isShowBtn
            }"
            >Сохранить</Button
        >
    </FloatLabel>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

interface Props {
    label: string
    modelValue: string
    valueOrigin: string
    onClick: () => void
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const isShowBtn = ref(false)

const handlerInputChange = (event) => {
    emit('update:modelValue', event.target.value)
}

watch(() => [props.modelValue, props.valueOrigin], ([modelValue, valueOrigin]) => {
    if (modelValue !== valueOrigin) {
        isShowBtn.value = true
    } else {
        isShowBtn.value = false
    }
})
</script>
