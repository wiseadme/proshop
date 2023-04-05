<script lang="ts">
  import { defineComponent } from 'vue'
  import { useOrderActionsModal } from '@modules/order/composables/use-order-actions-modal'
  import { useOrders } from '@modules/order/composables/use-orders'
  import { OrderDocument } from './OrderDocument'

  export default defineComponent({
    name: 'order-actions-modal',
    props: {
      users: {
        type: Array,
        default: () => []
      }
    },
    emits: [ 'close', 'update:order' ],
    setup() {
      const { order } = useOrders()
      const { showModal, openOrder, closeOrder } = useOrderActionsModal()
      const currentComponent = OrderDocument

      return {
        OrderDocument,
        currentComponent,
        showModal,
        order,
        openOrder,
        closeOrder,
      }
    }
  })

</script>
<template>
  <v-modal
    v-model="showModal"
    transition="scale-in"
    width="70%"
    overlay
  >
    <component
      :is="currentComponent"
      :order="order"
      :users="users"
      @close="$emit('close')"
      @update:order="$emit('update:order', $event)"
    />
  </v-modal>
</template>
