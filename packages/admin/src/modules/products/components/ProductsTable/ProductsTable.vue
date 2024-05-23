<script lang="ts" setup>
    import { useProductsTable } from '@modules/products/composables/use-products-table'
    import { icons } from '@shared/enums/icons'
    import { IProduct } from '@proshop/types'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'

    defineEmits<{
        (e: 'delete:product', product: IProduct): void
        (e: 'open:edit-modal'): void
        (e: 'open:create-modal'): void
    }>()

    const {
        cols,
        totalLength,
        products,
        onEditRow,
        onDeleteRow,
        onCreateRow,
        onUpdateTablePage,
        onUpdateTableRowsCount,
    } = useProductsTable()

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
            Таблица товаров
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="products || []"
                class="app-border-radius"
                :footer-options="{
                    counts: {
                        displayColor: 'primary',
                        rowsPerPageText: 'кол-во строк',
                        totalRows: totalLength,
                        rowsPerPageOptions: [10, 20, 30, 40]
                    },
                    pagination: {
                        buttonsColor: 'primary',
                        displayColor: 'primary'
                    }
                }"
                show-sequence
                @update:page="onUpdateTablePage"
                @update:rows-count="onUpdateTableRowsCount"
            >
                <template #toolbar>
                    <v-toolbar>
                        <v-toolbar-logo/>
                        <v-spacer/>
                        <v-toolbar-items>
                            <v-button
                                color="primary"
                                elevation="5"
                                data-test="create-modal"
                                @click="onCreateRow"
                            >
                                <v-icon
                                    size="14"
                                    sm
                                >
                                    {{ icons.PLUS }}
                                </v-icon>
                            </v-button>
                        </v-toolbar-items>
                    </v-toolbar>
                </template>
                <template #pagination-text="{start, last, length}">
                    <span>{{ start + ' - ' + last + ' из ' + length + ' строк' }}</span>
                </template>
                <template #actions="{row}">
                    <v-button
                        color="var(--primary)"
                        elevation="2"
                        text
                        @click="onEditRow(row)"
                    >
                        <v-icon>{{ icons.PEN }}</v-icon>
                    </v-button>
                    <v-button
                        class="ml-1"
                        color="var(--error)"
                        elevation="2"
                        text
                        @click="onDeleteRow(row)"
                    >
                        <v-icon>{{ icons.TRASH }}</v-icon>
                    </v-button>
                </template>
                <template #summary="{row}">
                    <span>{{ Number(row.quantity * row.price).toFixed(2) }}</span>
                </template>
                <template #image="{row}">
                    <div
                        v-if="row.image"
                        class="elevation-2"
                        style="width: 40px; height: 40px; border-radius: 50px; overflow: hidden"
                    >
                        <v-img
                            :src="row.image"
                            lazy
                            style="width: auto; height: 100%; object-fit: contain"
                        />
                    </div>
                    <span v-else>-</span>
                </template>
            </v-data-table>
        </template>
    </form-card>
</template>
