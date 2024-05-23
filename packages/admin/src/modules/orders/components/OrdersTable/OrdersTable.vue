<script lang="ts" setup>
    import { VSvg } from '@shared/components/VSvg'
    import { FormCard } from '@shared/components/FormCard'
    import { useOrders } from '@modules/orders/composables/use-orders'
    import { useOrdersTable } from '@modules/orders/composables/use-orders-table'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IOrder } from '@proshop/types'

    defineEmits<{
        (e: 'open:order', row: IOrder): void
    }>()

    const {
        orders,
        totalLength,
        onDeleteOrder,
    } = useOrders()

    const {
        cols,
        onUpdateTableRowsCount,
        onUpdateTablePage,
    } = useOrdersTable()

    const getOrderStatusClasses = (row: IOrder) => ({
        'primary': row.status.created && !row.status.seen,
        'blue lighten-1': row.status.seen && !row.status.confirmed,
        'teal accent-3': row.status.confirmed && !row.status.inProcess,
        'lime': row.status.inProcess && !row.status.ready,
        'purple': row.status.ready && !row.status.inDelivery,
        'pink lighten-3': row.status.inDelivery && !row.status.completed,
        'disabled': row.status.seen && row.status.completed,
    })

</script>
<template>
    <form-card>
        <template #icon>
            <v-svg
                :path="SvgPaths.TABLE_LIST"
                view-box="0 -30 512 512"
            />
        </template>
        <template #title>
            Таблица заказов
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="orders"
                key-prop="id"
                class="app-border-radius"
                :footer-options="{
                    counts: {
                        displayColor: 'primary',
                        rowsPerPageText: 'кол-во строк',
                        rowsPerPageOptions: [20, 40, 60, 80],
                        totalRows: totalLength,
                    },
                    pagination: {
                        buttonsColor: 'primary',
                        displayColor: 'primary',
                    }
                }"
                show-sequence
                @update:page="onUpdateTablePage"
                @update:rows-count="onUpdateTableRowsCount"
            >
                <template #pagination-text="{start, last, length}">
                    <span>{{ `с ${start} по ${last} из ${length}` }}</span>
                </template>
                <template #actions="{row}">
                    <v-button
                        color="var(--primary)"
                        elevation="2"
                        text
                        @click="$emit('open:order', row)"
                    >
                        <v-icon>fas fa-file-alt</v-icon>
                    </v-button>
                    <v-button
                        class="ml-1"
                        color="var(--error)"
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
                        >
                        <v-icon v-else>
                            fas fa-box
                        </v-icon>
                    </div>
                </template>
                <template #status="{ row, format }">
                    <div
                        class="d-flex justify-center align-center py-2 white--text"
                        :class="getOrderStatusClasses(row)"
                        style="width: 100%; height: 100%; border-radius: 10px"
                    >
                        {{ format(row) }}
                    </div>
                </template>
            </v-data-table>
        </template>
    </form-card>
</template>
