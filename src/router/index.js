import { createRouter, createWebHashHistory } from 'vue-router'
import LoginIndex from '../views/login/loginIndex.vue'

const routes = [
  {
    path: '/',
    name: 'LoginIndex',
    component: LoginIndex
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
