<script lang="ts" setup>
    import { useOrders } from '@modules/order/composables/use-orders'
    import { useOrdersTable } from '@modules/order/composables/use-orders-table'
    import { IOrder } from '@ecommerce-platform/types'

    defineEmits<{ (e: 'open:order', row: IOrder) }>()

    const {
        orders,
        totalLength,
        onDeleteOrder,
    } = useOrders()

    const {
        cols,
        onSort,
        onUpdateTableRowsCount,
        onUpdateTablePage,
    } = useOrdersTable()

</script>
<template>
    <v-data-table
        :cols="cols"
        :rows="orders"
        class="elevation-2 app-border-radius"
        :footer-options="{
            counts: {
                displayColor: 'primary',
                rowsPerPageText: 'кол-во строк',
                rowsPerPageOptions: [ 20, 40, 60, 80 ],
                totalRows: totalLength,
            },
            pagination: {
                buttonsColor: 'primary',
                displayColor: 'primary',
            }
        }"
        show-sequence
        @sort:column="onSort"
        @update:page="onUpdateTablePage"
        @update:rows-count="onUpdateTableRowsCount"
    >
        <template #pagination-text="{start, last, length}">
            <span>{{ `с ${start} по ${last} из ${length}` }}</span>
        </template>
        <template #actions="{row}">
            <v-button
                color="blue"
                elevation="2"
                text
                @click="$emit('open:order', row)"
            >
                <v-icon>fas fa-file-alt</v-icon>
            </v-button>
            <v-button
                class="ml-1"
                color="red darken-1"
                elevation="2"
                text
                :disabled="row.status && !row.status.seen"
                @click="onDeleteOrder(row)"
            >
                <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
        </template>
        <template #qrcode="{ row }">
            <div class="d-flex justify-center align-center">
                <img
                    v-if="row.qrcode"
                    style="height: 30px; width: auto"
                    :src="row.qrcode"
                />
                <v-icon v-else>
                    fas fa-box
                </v-icon>
            </div>
        </template>
        <template #status="{ row, format }">
            <div
                class="d-flex justify-center align-center py-2 white--text"
                :class="row.status && row.status.created && !row.status.seen ? 'primary' : 'success'"
                style="width: 100%; height: 100%; border-radius: 10px"
            >
                {{ format(row) }}
            </div>
        </template>
    </v-data-table>
</template>
