<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="credentials.username" type="text" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="credentials.password" type="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '@/stores/counter';
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        try {
          // Replace this URL with your actual login endpoint
          const response = await axios.post('http://localhost:8080/api/token', this.credentials);
          if (response.data.success) {
            const userStore = useUserStore();
            userStore.setUser(this.credentials.username);
            this.$router.push('/');
          } else {
            alert('Login failed. Please check your username and password.');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('An error occurred during login. Please try again.');
        }
      },
    },
  };
  </script>
  