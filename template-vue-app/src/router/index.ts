import { createRouter, createWebHistory } from 'vue-router'
import http from '@/request/http'

import AppHome from '@/views/AppHome.vue'
import AppAbout from '@/views/AppAbout.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/about', component: AppAbout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  http.cancelWhenRouteChanges()
  next()
})

export default router
