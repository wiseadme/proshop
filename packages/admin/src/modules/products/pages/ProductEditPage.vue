<script lang="ts" setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'

    const { setProductModel } = useProductModel()
    const { getProduct, onInit } = useProductsService()
    const { activeItem } = useRightSidebar()
    const route = useRoute()

    onMounted(async () => {
        await onInit()

        if (route.params.sku) {
            setProductModel(await getProduct(route.params.sku as string))
        }
    })
</script>
<template>
    <v-layout column>
        <component
            :is="activeItem.component"
            v-if="activeItem"
        />
        <component
            :is="activeItem.modal"
            v-if="activeItem && activeItem.modal"
        />
    </v-layout>
</template>
