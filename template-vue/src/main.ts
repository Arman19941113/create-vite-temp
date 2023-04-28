import '@/styles/tailwind.css'
import '@/styles/variable.css'
import '@/styles/reset.css'
import '@/styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initRouter } from '@/router'
import { initI18n } from '@/locales'
import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(initRouter())
app.use(initI18n())

app.mount('#app')
