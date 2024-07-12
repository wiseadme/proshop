<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'
    import { useOrders } from '@modules/orders/composables/use-orders'

    import OrderActionsModal from '@modules/orders/components/OrderActionsModal'
    import OrdersTable from '@modules/orders/components/OrdersTable'

    const {
        orders,
        order,
        users,
        getUsers,
        onOpenOrder,
    } = useOrders()

    const { showModal } = useOrderActionsModal()

    onBeforeMount(getUsers)

</script>
<template>
    <v-row>
        <v-col>
            <orders-table
                :rows="orders"
                @open:order="onOpenOrder"
            />
            <order-actions-modal
                v-if="users"
                v-model="showModal"
                :order="order"
                :users="users"
                @close="showModal = false"
            />
        </v-col>
    </v-row>
</template>
