import { createRouter, createWebHistory } from 'vue-router'
import { http } from '@/utils'

import AppHome from '@/views/AppHome.vue'
import AppAbout from '@/views/AppAbout.vue'

export const ROUTE_NAMES = {
  APP_HOME: 'appHome',
  APP_ABOUT: 'appAbout',
}

export function initRouter () {

  const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: ROUTE_NAMES.APP_HOME,
      component: AppHome,
    },
    {
      path: '/about',
      name: ROUTE_NAMES.APP_ABOUT,
      component: AppAbout,
    },
    {
      path: '/:pathMatch(.*)',
      component: {
        template: '<div style="text-align: center;">404 Not Found</div>',
      },
    },
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

  return router
}
