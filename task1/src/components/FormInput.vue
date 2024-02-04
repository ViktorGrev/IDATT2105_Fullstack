<template>

<div class="form__group field">
    <!-- Bind the input's value to the prop and emit an update on change -->
    <input :type="type" class="form__field" :placeholder="fieldName" :name="fieldName.toLowerCase()" :id="fieldName.toLowerCase()" v-model="inputValue" @input="onInput" required />

    <label :for="fieldName.toLowerCase()" class="form__label">{{ fieldName }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

const props = defineProps<{
  fieldName: string;
  type: string;
  modelValue: string; // Accept the v-model value
}>();

// Internal state for the input value
const inputValue = ref(props.modelValue);

// Emit update event to the parent component
const emit = defineEmits(['update:modelValue']);

const onInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement; // Cast to HTMLInputElement
  updateValue(target.value);
};

const updateValue = (value: string) => {
  emit('update:modelValue', value);
};

// Ensure the internal state is updated if the prop changes
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});
</script>

<style>
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
}

.form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown~.form__label {
        font-size: 1.3rem;
        cursor: text;
        top: 20px;
    }
}

.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
}

.form__field:focus {
    ~.form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #11998e;
        font-weight: 700;
    }

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
}

/* reset input */
.form__field {

    &:required,
    &:invalid {
        box-shadow: none;
    }
}</style>
