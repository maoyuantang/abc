import { createRouter, createWebHashHistory } from 'vue-router'
import LoginIndex from '../views/login/loginIndex.vue'

const routes = [
  {
    path: '/',
    name: 'LoginIndex',
    component: LoginIndex
  },
  {
    path: '/home',
    name: 'homeIndex',
    component: () => import('../views/home/homeIndex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
