import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue'; // Assuming you have this import for consistency
import LoginView from '../views/LoginView.vue'; // Make sure the path is correct

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // Add the login route here
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});

export default router;