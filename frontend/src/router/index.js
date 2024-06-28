import { createWebHistory, createRouter } from 'vue-router'

import Main from '../view/Main.vue'
import Login from '../view/Login.vue'
import CreateRecipe from '../view/CreateRecipe.vue';

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
  {
    path: '/CreateRecipe',
    name: 'create new recipe',
    component: CreateRecipe
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;