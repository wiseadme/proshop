<script setup lang="ts">
  import { onMounted, onBeforeUnmount, watch } from 'vue'
  import MainLayout from '@shared/layouts/MainLayout'
  import AuthLayout from '@shared/layouts/AuthLayout'
  import VNotifications from '@shared/components/VNotifications/VNotifications.vue'
  import { usePolling } from '@shared/composables/use-polling'
  import { useNotifications } from '@shared/components/VNotifications/use-notifications'
  import { useOrdersStore } from '@modules/order/store'
  import { IOrder } from '@modules/order/types'

  const ordersStore = useOrdersStore()
  const { notify, clear } = useNotifications()

  const { stopPolling, startPolling } = usePolling({
    handler: () => ordersStore.read(),
    timeout: 5000
  })

  onMounted(() => {
    startPolling()
  })

  onBeforeUnmount(() => {
    stopPolling()
  })

  watch(() => ordersStore.orders, (newOrders: IOrder[]) => {
    const notSeen = newOrders?.map(o => o.status.created && !o.status.seen)

    if (notSeen.length) {
      clear()

      setTimeout(() => notify({
        title: 'Новые заказы',
        text: `У вас ${ notSeen.length } новых не просмотренных заказа`,
        type: 'warning',
        closeOnClick: true
      }), 500)
    }
  })

</script>
<template>
  <v-app class="grey lighten-4">
    <v-layout column>
      <main-layout v-if="!$route.path.includes('auth')"/>
      <auth-layout v-else/>
      <v-notifications position="bottom right"/>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '@/shared/assets/scss/main';
</style>
