import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Vueland from 'vueland/lib'

import 'vueland/dist/css/vueland-base.css'
import 'vueland/dist/css/themes/vueland-theme.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Vueland)
app.use(pinia)
app.use(router)

router.isReady().then(() => app.mount('#app'))
