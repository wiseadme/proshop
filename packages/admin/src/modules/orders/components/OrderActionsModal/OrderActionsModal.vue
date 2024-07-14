<script lang="ts" setup>
    import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'

    import { IOrder } from '@proshop/types'

    import { OrderDocument } from './OrderDocument'

    defineEmits<{
        (e: 'close'): void
        (e: 'update:order', order: IOrder): void
    }>()

    const { showModal, closeOrder } = useOrderActionsModal()

</script>
<template>
    <v-modal
        v-model="showModal"
        transition="scale-in"
        width="70%"
        overlay
    >
        <order-document @close="closeOrder"/>
    </v-modal>
</template>
