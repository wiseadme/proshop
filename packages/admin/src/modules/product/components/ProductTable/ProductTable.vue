<script lang="ts" setup>
    import { icons } from '@shared/enums/icons'
    import { useProductsTable } from '@modules/product/composables/use-products-table'
    import { IProduct } from '@proshop/types'
    import { useProduct } from '@modules/product/composables/use-product'

    defineEmits<{
        (e: 'delete:product', product: IProduct): void
        (e: 'open:edit-modal'): void
        (e: 'open:create-modal'): void
    }>()

    const {
        onOpenCreateProductModal,
        onOpenEditProductModal,
        onDeleteProduct,
    } = useProduct()

    const {
        cols,
        totalLength,
        products,
        // onSortColumn,
        onUpdateTablePage,
        onUpdateTableRowsCount
    } = useProductsTable()

</script>
<template>
    <v-data-table
        :cols="cols"
        :rows="products || []"
        class="elevation-2 app-border-radius"
        :footer-options="{
            counts: {
                displayColor: 'primary',
                rowsPerPageText: 'кол-во строк',
                totalRows: totalLength,
                rowsPerPageOptions: [20, 40, 60, 80]
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
                <v-toolbar-logo></v-toolbar-logo>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-button
                        color="primary"
                        elevation="5"
                        @click="onOpenCreateProductModal"
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
                color="orange"
                elevation="2"
                text
                style="z-index: 0"
                @click="onOpenEditProductModal(row)"
            >
                <v-icon>{{ icons.PEN }}</v-icon>
            </v-button>
            <v-button
                class="ml-1"
                color="red darken-1"
                elevation="2"
                text
                style="z-index: 0"
                @click="onDeleteProduct(row)"
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
                <img
                    :src="row.image"
                    :alt="row.name"
                    style="width: auto; height: 100%; object-fit: contain"
                >
            </div>
            <span v-else>null</span>
        </template>
    </v-data-table>
</template>
