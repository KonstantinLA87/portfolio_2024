<template>
    <div class="input-wrap">
        <FloatLabel>
            <InputText 
                v-if="type === 'input'"
                class="p-filled" 
                :id="props.name" 
                :value="props.modelValue" 
                @input="handlerInputChange" 
            />
            <Dropdown 
                v-if="type === 'select'"
                class="p-filled" 
                :id="props.name"
                :value="props.modelValue" 
                :options="props.options" 
                @input="handlerInputChange"
            />
            <label :for="props.name">{{ props.label }}</label>
            <Button
                class="invisible ml-3"
                @click="onClick"
                :class="{
                    active: isShowBtn
                }"
                >Сохранить</Button
            >
        </FloatLabel>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';

import type { ImpotWithInvisibleBtnType } from '@/types/components';

interface Props {
    type: ImpotWithInvisibleBtnType
    name: string
    label: string
    modelValue: string
    valueOrigin: string
    options?: string[]
    onClick: () => void
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const isShowBtn = ref(false)

const handlerInputChange = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

watch(
    () => [props.modelValue, props.valueOrigin],
    ([modelValue, valueOrigin]) => {
        if (modelValue !== valueOrigin) {
            isShowBtn.value = true
        } else {
            isShowBtn.value = false
        }
    }
)
</script>
