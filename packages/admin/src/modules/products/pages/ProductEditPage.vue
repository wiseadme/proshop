<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        onMounted,
        ref,
        unref,
    } from 'vue'
    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import TabSelector from '@/shared/components/TabSelector/TabSelector.vue'
    import { useRoute } from 'vue-router'

    const ProductAttributesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductAttributesBlock.vue')))
    const ProductConditionsBlock = markRaw(defineAsyncComponent(() => import( '@modules/products/components/ProductActions/ProductConditionsBlock.vue')))
    const ProductVariantsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductVariantsBlock.vue')))
    const ProductMetaTagsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductMetaTagsBlock.vue')))
    const ProductRelatedBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductRelatedBlock.vue')))
    const ProductInfoBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductInfoBlock.vue')))
    const ProductImagesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductImagesBlock.vue')))
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductCategoriesBlock.vue')))

    const { model } = useProduct()
    const { categoryItems, getProduct } = useProductsService()

    const route = useRoute()

    const tabs = computed(() => [
        {
            component: ProductInfoBlock,
            title: 'Информация о товаре',
            isActive: true,
            disabled: false,
            independent: false,
            section: 'info',
        },
        {
            component: ProductImagesBlock,
            title: 'Изображения товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: true,
            section: 'images',
        },
        {
            component: ProductCategoriesBlock,
            title: 'Категории товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: false,
            section: 'categories',
        },
        {
            component: ProductAttributesBlock,
            title: 'Атрибуты товара',
            isActive: false,
            disabled: !unref(model).id,
            section: 'attributes',
            independent: false,
        },
        {
            component: ProductMetaTagsBlock,
            title: 'Метатеги товара',
            isActive: false,
            disabled: !unref(model).id,
            section: 'meta-tags',
            independent: false,
        },
        {
            component: ProductVariantsBlock,
            title: 'Варианты товара',
            isActive: false,
            disabled: !unref(model).id,
            section: 'variants',
            independent: true,
        },
        {
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(model).id || !unref(categoryItems)?.length,
            section: 'related',
            independent: true,
        },
        {
            component: ProductConditionsBlock,
            title: 'Состояние товара',
            isActive: false,
            disabled: !unref(model).id,
            section: 'conditions',
            independent: false,
        },
    ])

    const currentTab = ref(unref(tabs)[0])

    onMounted(async () => {
        model.value = await getProduct(route.params.productId)

        const currentTabIndex = unref(tabs).findIndex(tab => route.params.section === tab.section)
        currentTab.value = unref(tabs)[currentTabIndex || 0]
    })
</script>
<template>
    <v-layout column>
        <tab-selector
            v-model="currentTab"
            :tabs="tabs"
        >
            <template #content>
                <component :is="currentTab.component"></component>
            </template>
        </tab-selector>
    </v-layout>
</template>
