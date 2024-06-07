import { createWebHistory, createRouter } from 'vue-router'

import Main from '../view/Main.vue'
import Login from '../view/Login.vue'

const routes = [
  { 
    path: '/', 
    name: 'home View',
    component: Main 
  },
  { 
    path: '/login', 
    name: 'login view',
    component: Login 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;