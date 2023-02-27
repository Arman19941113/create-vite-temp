import { createRouter, createWebHistory } from 'vue-router'
import { http } from '@/utils'

import AppHome from '@/views/AppHome.vue'
import AppAbout from '@/views/AppAbout.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/about', component: AppAbout },
  { path: '/:pathMatch(.*)', component: { template: '<div style="text-align: center;">404 Not Found</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let initialized = false

router.beforeEach((to, from, next) => {
  if (initialized) {
    http.clearRequests()
  } else {
    initialized = true
  }
  next()
})

export { router }
