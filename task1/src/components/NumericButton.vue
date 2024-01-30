<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  value: number;
}>();

const emit = defineEmits();

const logNumber = () => {
  emit('number-clicked', props.value);
};
</script>

<template>
  <div class="ButtonHolder">
    <button class="NumButton" @click="logNumber">{{ value }}</button>
  </div>
</template>

<style scoped>
.ButtonHolder {
  margin: 5px;
  padding: 2px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
}

.ButtonHolder .NumButton {
  width: 100%;
  height: 100%;
  background-color: orange;
  color: black;
  border-radius: 50%;
  font-size: 30px;
}

.ButtonHolder .NumButton:hover {
  border: 5px solid red;
}
</style>
