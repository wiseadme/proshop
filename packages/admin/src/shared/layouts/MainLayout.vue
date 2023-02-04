<script setup lang="ts">
  import { onMounted, onBeforeUnmount, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePolling } from '@shared/composables/use-polling'
  import { useNotifications } from '@shared/components/VNotifications/use-notifications'
  import { useOrdersService } from '@modules/orders/service/order.service'
  // Components
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'
  import VNotifications from '@shared/components/VNotifications/VNotifications.vue'
  // Types
  import { IOrder } from '@ecommerce-platform/types'

  const router = useRouter()
  const ordersService = useOrdersService()
  const { notify, remove } = useNotifications()

  const { stopPolling, startPolling } = usePolling({
    handler: () => ordersService.getNewOrders(),
    timeout: 5000
  })

  let notSeenCount = 0
  let newOrdersNotifyId = null

  onMounted(() => {
    startPolling()
  })

  onBeforeUnmount(() => {
    stopPolling()
  })

  watch(() => ordersService.newOrders!, (newOrders: IOrder[]) => {
    if (notSeenCount !== newOrders.length) {
      if (newOrdersNotifyId) {
        remove(newOrdersNotifyId)
      }

      notSeenCount = newOrders.length

      if (notSeenCount) {
        setTimeout(() => {
          newOrdersNotifyId = notify({
            title: 'Новые заказы',
            text: `У вас ${ notSeenCount } новых не просмотренных заказа`,
            type: 'warning',
            closeOnClick: false,
            actions: {
              events: {
                onClick: () => {
                  remove(newOrdersNotifyId)

                  newOrdersNotifyId = null
                  notSeenCount = 0

                  if (router.currentRoute.value.path.includes('/orders')) {
                    ordersService.getOrders()
                  }

                  router.replace({ name: 'orders-table' })
                }
              }
            }
          }) as any
        }, 500)
      }
    }
  })
</script>
<template>
  <app-header/>
  <app-navigation/>
  <v-main
    class="main-layout"
    style="padding: 66px 0 10px 56px"
  >
    <router-view/>
  </v-main>
  <v-notifications position="bottom right"/>
</template>
<style lang="scss">
</style>
