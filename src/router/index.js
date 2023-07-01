import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Forgot_Password from '../components/Forgot_Password.vue'
import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },

  {
    path: '/forgot',
    name: 'forgot-password',
    component: Forgot_Password
  },

  {
    path: '/home',
    name: 'home',
    component: Home,
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
