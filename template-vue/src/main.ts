import '@/styles/variable.css'
import '@/styles/reset.css'
import '@/styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from '@/router'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
