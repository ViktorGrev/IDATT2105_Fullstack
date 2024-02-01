<template>
    <div class="InputHolder">
        <label> {{ fieldName }}</label>
        <input type="{{ type }}">
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  fieldName: string;
  type: string
}>();
</script>

<style>
    .InputHolder {
        display: flex;
        flex-direction: column;
        
    }
</style>