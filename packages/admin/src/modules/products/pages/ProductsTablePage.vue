<script lang="ts" setup>
    // Components
    import { useProductsService } from '@modules/products/composables/use-products-service'

    import { ProductsTable } from '@modules/products/components/ProductsTable'
    // Composables

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
