<script lang="ts" setup>
    import {
        onBeforeUnmount,
        onMounted,
        watch,
    } from 'vue'
    import { useRouter } from 'vue-router'
    import { usePolling } from '@shared/composables/use-polling'
    import { useNotifications } from '@shared/components/VNotifications/use-notifications'
    import { useOrdersService } from '@modules/order/composables/use-orders-service'
    // Components
    import { AppHeader } from '@app/components/AppHeader'
    import { AppNavigation } from '@app/components/AppNavigation'
    import VNotifications from '@shared/components/VNotifications/VNotifications.vue'
    // Types
    import { IOrder, Maybe } from '@proshop/types'
    import { useAuthService } from '@shared/composables/use-auth-service'

    const router = useRouter()
    const { newOrders, getNewOrders, getOrders } = useOrdersService()
    const { notify, remove } = useNotifications()
    const { user } = useAuthService()

    const { stopPolling, startPolling } = usePolling({
        handler: () => getNewOrders(),
        timeout: 5000,
    })
    let notSeenCount = 0

    let newOrdersNotifyId: Maybe<number> = null
    onMounted(() => startPolling())
    onBeforeUnmount(() => stopPolling())

    const onClick = () => {
        remove(newOrdersNotifyId)

        newOrdersNotifyId = null
        notSeenCount = 0

        if (router.currentRoute.value.path.includes('/order')) {
            getOrders()
        }

        router.replace({ name: 'order-table' })
    }

    watch(newOrders!, (newOrders: IOrder[]) => {
        if (notSeenCount !== newOrders.length) {
            if (newOrdersNotifyId) {
                remove(newOrdersNotifyId)
            }

            notSeenCount = newOrders.length

            if (notSeenCount) {
                setTimeout(() => {
                    newOrdersNotifyId = notify({
                        title: 'Новые заказы',
                        text: `У вас ${notSeenCount} новых не просмотренных заказа`,
                        type: 'success',
                        closeOnClick: false,
                        actions: {
                            events: { onClick },
                        },
                    }) as number
                }, 500)
            }
        }
    })

</script>
<template>
    <v-layout v-if="user">
        <app-header/>
        <app-navigation/>
        <v-main
            class="main-layout"
            style="padding: 66px 10px 10px 247px; width: 100%;"
        >
            <router-view/>
        </v-main>
    </v-layout>
    <v-notifications position="bottom right"/>
</template>
<style lang="scss">
</style>
