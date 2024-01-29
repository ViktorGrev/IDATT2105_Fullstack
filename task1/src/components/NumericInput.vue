<template>
  <input type="text" class="NumericInput" :value="displayedNumber" @input="handleInput">
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  displayedNumber: string | null;
}>();

const emit = defineEmits();

const handleInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit('input', inputValue); // Emit only the input value
};
</script>
  
<style scoped>
.NumericInput {
  padding: 20px 30px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  border: 2px solid black;
  text-align: right;
}

.NumericInput:hover {
  border-color: #2ecc71;
}
</style>
  