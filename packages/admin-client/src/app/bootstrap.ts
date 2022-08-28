import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { vueland } from '@shared/plugins/vueland'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(vueland)
app.use(pinia)
app.use(router)

console.log(app)

router.isReady().then(() => app.mount('#app'))
