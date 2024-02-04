<template>
  <div id="formFrame">
    <form @submit.prevent="submitForm">
      <h3 id="title">{{ title }}</h3>
      <FormInput v-model="name" fieldName="Name" type="text"></FormInput>
      <FormInput v-model="email" fieldName="Email" type="text"></FormInput>
      <br>
      <label for="feedback">Your feedback:</label>
      <textarea v-model="message" placeholder="Write here" rows="5" name="comment[text]" id="comment_text" cols="33" required></textarea>
      <button type="submit" class="btn" :disabled="!isFormValid">
        <span>Send</span>
      </button>
    </form>
    <nav>
      <RouterLink to="/">Calculator</RouterLink>
      <RouterLink to="/about">Forms</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useFormStore } from '@/stores/counter'; // Oppdater denne stien etter behov
import FormInput from '@/components/FormInput.vue';

// Definerer props for komponenten
const props = defineProps<{
  title: string;
}>();

// Bruker useFormStore for å hente og sette tilstand
const store = useFormStore();

// Lokale ref-er som er bundet til input-feltene og initialiseres med verdier fra butikken
const name = ref(store.name);
const email = ref(store.email);
const message = ref('');

// Se på endringer i navn og e-post og oppdater butikken tilsvarende
watch(name, (newName) => {
  store.setName(newName);
});

watch(email, (newEmail) => {
  store.setEmail(newEmail);
});

// Valideringslogikk
const isFormValid = computed(() => {
  return name.value.trim() !== '' && email.value.trim() !== '' && message.value.trim() !== '';
});

// Form submit handling
const submitForm = () => {
  if (isFormValid.value) {
    // Her kan du implementere logikk for å faktisk sende formdata til en server eller lignende
    console.log('Form submitted with:', { name: name.value, email: email.value, message: message.value });
    // Nullstiller skjemaet (valgfritt)
    message.value = '';
  } else {
    console.log('Form not submitted - validation failed');
  }
};
</script>

<style>
#formFrame {
  width: 400px;
  padding: 40px;
  border-radius: 50px;
  color: #11998e;
}

label {
  font-size: 0.8rem;
  letter-spacing: 1px;
}

textarea {
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}

label {
  display: block;
  margin-bottom: 10px;
}

textarea {
  width: 500px;
  height: 100px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(255, 255, 255, 0.151);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 0.9em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
}


textarea:focus {
    background: none repeat scroll 0 0 #FFFFFF;
    outline-width: 0;
}

.btn {
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91C9FF;
  outline: none;
  transition: 1s ease-in-out;
}

.btn:hover {
  transition: 1s ease-in-out;
  background: #4F95DA;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}

.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}
</style>