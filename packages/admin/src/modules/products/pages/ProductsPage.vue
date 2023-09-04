<script lang="ts" setup>
    // Components
    import { ProductActionsModal } from '@modules/products/components/ProductActionsModal'
    import { ProductTable } from '@modules/products/components/ProductTable'
    import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'
    // Composables
    import { useProduct } from '@modules/products/composables/use-product'

    const {
        isLoading,
        onInit,
    } = useProduct()

    onInit()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col cols="12">
                <skeleton-preloader v-if="isLoading"/>
                <product-table v-else/>
            </v-col>
        </v-row>
        <product-actions-modal/>
    </v-layout>
</template>
