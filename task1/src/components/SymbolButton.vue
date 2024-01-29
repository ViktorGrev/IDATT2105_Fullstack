<template>
  <div class="ButtonHolder">
    <button class="SymButton" @click="emitSymbol">{{ value }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits();

const emitSymbol = () => {
  emit('symbol-clicked', props.value);
};
</script>

<style scoped>
.ButtonHolder {
  margin: 5px;
  padding: 2px;
  width: 40px;
  height: 40px;
}

.ButtonHolder .SymButton {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  color: black;
}

.ButtonHolder .SymButton:hover {
    border: 5px solid red;
}
</style>
