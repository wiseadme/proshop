import { createApp } from 'vue'

import { createNervue } from 'nervue'

import { vueland } from '@shared/plugins/vueland'

import App from './App.vue'
import { router } from './router'

const nervue = createNervue()

const app = createApp(App)

app.use(vueland)
app.use(router)
app.use(nervue)

router.isReady().then(() => app.mount('#app'))

