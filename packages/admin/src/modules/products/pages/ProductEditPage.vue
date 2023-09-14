<script lang="ts" setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { useProductRightSidebar } from '@modules/products/composables/use-product-right-sidebar'

    const { setProductModel } = useProductModel()
    const { getProduct, onInit } = useProductsService()
    const { activeItem } = useProductRightSidebar()

    const route = useRoute()

    const onEdit = () => {}

    onMounted(async () => {
        await onInit()

        if (route.params.productId) {
            setProductModel(await getProduct(route.params.productId as string))
        }
    })
</script>
<template>
    <v-layout column>
        <component
            :is="activeItem.component"
            v-if="activeItem"
            @edit="onEdit"
        ></component>
        <v-modal>
        </v-modal>
    </v-layout>
</template>
