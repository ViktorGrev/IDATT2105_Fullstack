<template>
    <form>
        <h3> {{ title }} </h3>
        <FormInput fieldName="Name" type="text"></FormInput>
        <FormInput fieldName="Email" type="email"></FormInput>
        <button>Send</button>
    </form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FormInput from '@/components/FormInput.vue';

const props = defineProps<{
  title: string;
}>();
</script>