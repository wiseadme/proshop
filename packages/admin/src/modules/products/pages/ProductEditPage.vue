<script lang="ts" setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { useProductRightSidebar } from '@modules/products/composables/use-product-right-sidebar'

    const { model } = useProduct()
    const { getProduct, onInit } = useProductsService()
    const { activeItem } = useProductRightSidebar()

    const route = useRoute()

    onMounted(async () => {
        await onInit()
        model.value = await getProduct(route.params.productId as string)
    })
</script>
<template>
    <v-layout column>
        <component
            :is="activeItem.component"
            v-if="activeItem"
        ></component>
    </v-layout>
</template>
