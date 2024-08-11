import { defineComponent, h } from 'vue'

import Notification from './VNotification.vue'

// eslint-disable-next-line vue/one-component-per-file
export const InfoNotification = defineComponent({
    name: 'v-notification-info',
    setup() {
        return () => h(Notification, { color: 'primary' } as typeof Notification.props)
    },
})
// eslint-disable-next-line vue/one-component-per-file
export const SuccessNotification = defineComponent({
    name: 'v-notification-success',
    setup() {
        return () => h(Notification, { color: 'success' } as typeof Notification.props)
    },
})
// eslint-disable-next-line vue/one-component-per-file
export const WarningNotification = defineComponent({
    name: 'v-notification-warning',
    setup() {
        return () => h(Notification, { color: 'yellow darken-4' } as typeof Notification.props)
    },
})
// eslint-disable-next-line vue/one-component-per-file
export const SimpleNotification = defineComponent({
    name: 'v-notification-simple',
    setup() {
        return () => h(Notification, { color: 'blue darken-2' } as typeof Notification.props)
    },
})
// eslint-disable-next-line vue/one-component-per-file
export const ErrorNotification = defineComponent({
    name: 'v-notification-error',
    setup() {
        return () => h(Notification, { color: 'red darken-1' } as typeof Notification.props)
    },
})
