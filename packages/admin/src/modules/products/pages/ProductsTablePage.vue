<script lang="ts" setup>
    // Components
    import { ProductsTable } from '@modules/products/components/ProductsTable'
    // Composables
    import { useProductsService } from '@modules/products/composables/use-products-service'

    const { getProducts } = useProductsService()

    getProducts()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col cols="12">
                <products-table />
            </v-col>
        </v-row>
    </v-layout>
</template>
