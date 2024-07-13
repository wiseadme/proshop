<script lang="ts" setup>
    import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'
    import { useOrders } from '@modules/orders/composables/use-orders'

    import { IOrder, IUser } from '@proshop/types'

    import { OrderDocument } from './OrderDocument'

    const { users = [] } = defineProps<{ users: IUser[] }>()

    defineEmits<{
        (e: 'close'): void
        (e: 'update:order', order: IOrder): void
    }>()

    const { order } = useOrders()
    const { showModal, closeOrder } = useOrderActionsModal()

    const currentComponent = OrderDocument

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
            class="app-border-radius"
            @close="closeOrder"
            @update:order="$emit('update:order', $event)"
        />
    </v-modal>
</template>
