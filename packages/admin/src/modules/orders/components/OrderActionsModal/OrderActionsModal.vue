<script lang="ts" setup>
    import { useOrderActionsModal } from '@modules/orders/composables/view/use-order-actions-modal'

    import { IOrder } from '@proshop-app/types'

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
