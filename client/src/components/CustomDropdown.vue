<template>
    <div>
        <Dropdown 
            v-if="props.type === 'select'"
            v-model="selectedOption" 
            :options="props.options"
            @change="onOptionChange"
        />
        <Button
            class="invisible ml-3"
            @click="props.onClick"
            :class="{
                active: isShowBtn
            }"
        >Сохранить</Button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button'

import type { Room } from '@/types/chat';
import type { ImpotWithInvisibleBtnType } from '../types/components';

interface Props {
    type: ImpotWithInvisibleBtnType
    options: string[]
    valueOrigin: Room
    onClick: () => void
}

const props = defineProps<Props>()
const emit = defineEmits(['optionSelected'])

const isShowBtn = ref(false)

const selectedOption = ref(props.valueOrigin);

const onOptionChange = () => {
    if (selectedOption.value !== props.valueOrigin) {
        isShowBtn.value = true
    } else {
        isShowBtn.value = false
    }
    emit('optionSelected', selectedOption.value);
};
</script>
