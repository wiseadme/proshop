<script lang="ts" setup>
    // Components
    import { ProductTable } from '@modules/products/components/ProductTable'
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
                <product-table v-else/>
            </v-col>
        </v-row>
    </v-layout>
</template>
