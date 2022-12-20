<script setup lang="ts">
  import { onMounted, onBeforeUnmount, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePolling } from '@shared/composables/use-polling'
  import { useNotifications } from '@shared/components/VNotifications/use-notifications'
  import { useOrdersStore } from '@modules/order/store'
  import { useAuthService } from '@shared/services/auth.service'
  // Components
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'
  import VNotifications from '@shared/components/VNotifications/VNotifications.vue'
  import { IOrder } from '@ecommerce-platform/types/index'

  const router = useRouter()

  const authService = useAuthService()
  authService.setUserFromStorage().catch(() => router.push({ name: 'auth' }))

  const ordersStore = useOrdersStore()
  const { notify, remove } = useNotifications()

  const { stopPolling, startPolling } = usePolling({
    handler: () => ordersStore.read(),
    timeout: 5000
  })

  let notSeenCount = 0

  let newOrdersNotifyId

  onMounted(() => {
    startPolling()
  })

  onBeforeUnmount(() => {
    stopPolling()
  })

  watch(() => ordersStore.orders!, (newOrders: IOrder[]) => {
    const notSeenOrders = newOrders?.filter(o => o.status.created && !o.status.seen)

    if (notSeenCount !== notSeenOrders.length) {
      if (newOrdersNotifyId) {
        remove(newOrdersNotifyId)
      }

      notSeenCount = notSeenOrders.length

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

                  router.replace({ name: 'orders-table' })
                }
              }
            }
          })
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
