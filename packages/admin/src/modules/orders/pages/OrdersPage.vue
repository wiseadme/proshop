<script lang="ts" setup>
    import OrdersTable from '@modules/orders/components/OrdersTable'
    import OrderActionsModal from '@modules/orders/components/OrderActionsModal'
    import { useOrders } from '@modules/orders/composables/use-orders'
    import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'

    const {
        orders,
        order,
        users,
        getUsers,
        onOpenOrder,
    } = useOrders()

    const { showModal } = useOrderActionsModal()

    getUsers()

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
