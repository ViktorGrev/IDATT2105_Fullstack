import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', () => {
  const name = ref('');
  const email = ref('');

  function setName(newName: string) {
    name.value = newName;
  }

  function setEmail(newEmail: string) {
    email.value = newEmail;
  }

  return { name, email, setName, setEmail };
});
