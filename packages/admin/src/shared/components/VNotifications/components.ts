import { defineComponent, h } from 'vue'
import Notification from './VNotification.vue'

export const InfoNotification = defineComponent({
    name: 'v-notification-info',
    setup(){
        return () => h(Notification, { color: 'primary' })
    }
})

export const SuccessNotification = defineComponent({
    name: 'v-notification-success',
    setup(){
        return () => h(Notification, { color: 'success' })
    }
})

export const WarningNotification = defineComponent({
    name: 'v-notification-warning',
    setup(){
        return () => h(Notification, { color: 'yellow darken-4' })
    }
})

export const SimpleNotification = defineComponent({
    name: 'v-notification-simple',
    setup(){
        return () => h(Notification, { color: 'blue darken-2' })
    }
})
