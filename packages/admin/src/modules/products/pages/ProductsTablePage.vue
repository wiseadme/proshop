<script lang="ts" setup>
    // Components
    import { ProductsTable } from '@modules/products/components/ProductsTable'
    import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'
    // Composables
    import { useProductsService } from '@modules/products/composables/use-products-service'

    const { isLoading, getProducts } = useProductsService()

    getProducts()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col cols="12">
                <skeleton-preloader v-if="isLoading"/>
                <products-table v-else/>
            </v-col>
        </v-row>
    </v-layout>
</template>
