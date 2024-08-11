<script lang="ts" setup>
    import { useOrderActionsModal } from '@modules/orders/composables/view/use-order-actions-modal'
    import { useOrders } from '@modules/orders/composables/view/use-orders'

    import OrderActionsModal from '@modules/orders/components/OrderActionsModal'
    import OrdersTable from '@modules/orders/components/OrdersTable'

    const {
        orders,
        onOpenOrder,
    } = useOrders()

    const { showModal } = useOrderActionsModal()

</script>
<template>
    <v-row>
        <v-col>
            <orders-table
                :rows="orders"
                @open:order="onOpenOrder"
            />
            <order-actions-modal v-model="showModal"/>
        </v-col>
    </v-row>
</template>
