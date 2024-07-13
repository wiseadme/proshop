<script lang="ts" setup>
    import { onMounted } from 'vue'

    import { useRoute } from 'vue-router'

    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'

    import { useRightSidebar } from '@shared/composables/use-right-sidebar'

    const { setProductModel } = useProductModel()
    const { getProduct, onInit } = useProductsService()
    const { setCurrentProduct } = useProduct()
    const { activeItem } = useRightSidebar()
    const route = useRoute()

    onMounted(async () => {
        await onInit()

        if (route.params.sku) {
            const product = await getProduct(route.params.sku as string)

            setCurrentProduct(product)

            setProductModel(product)
        }
    })
</script>
<template>
    <v-layout column>
        <v-form>
            <component
                :is="activeItem.component"
                v-if="activeItem"
            />
        </v-form>
        <component
            :is="activeItem.modal"
            v-if="activeItem && activeItem.modal"
        />
    </v-layout>
</template>
