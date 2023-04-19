<script lang="ts" setup>
  import OrdersTable from '@modules/order/components/OrdersTable'
  import OrderActionsModal from '@modules/order/components/OrderActionsModal'
  import { useOrdersService } from '@modules/order/composables/use-orders-service'
  import { useOrders } from '@modules/order/composables/use-orders'
  import { useOrderActionsModal } from '@modules/order/composables/use-order-actions-modal'

  const {
    orders,
    onOpenOrder,
  } = useOrders()

  const { showModal } = useOrderActionsModal()

  /** TODO - вынести в хук useOrders */
  const {
    order,
    users,
    getUsers
  } = useOrdersService()

  await getUsers()

</script>
<template>
  <v-row>
    <v-col>
      <orders-table
        :rows="orders"
        @open:order="onOpenOrder"
      />
      <order-actions-modal
        v-model="showModal"
        :order="order"
        :users="users"
        @close="showModal = false"
      />
    </v-col>
  </v-row>
</template>
