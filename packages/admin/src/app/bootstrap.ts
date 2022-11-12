import { createApp } from 'vue'
import { router } from './router'
import { vueland } from '@shared/plugins/vueland'
// import { store } from './store'
import App from './App.vue'
import { createNervue } from 'nervue'

const store = createNervue()

const app = createApp(App)

app.use(vueland)
app.use(router)
app.use(store)

router.isReady().then(() => app.mount('#app'))

