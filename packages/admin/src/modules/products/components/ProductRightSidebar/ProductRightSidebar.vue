<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        unref,
    } from 'vue'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { SidebarTab } from '@shared/composables/use-right-sidebar'
    import { useRoute, useRouter } from 'vue-router'
    import { RouteNames } from '@modules/products/enums/route-names'
    import {
        ATTRIBUTES_BLOCK,
        CATEGORIES_BLOCK,
        CONDITIONS_BLOCK,
        IMAGES_BLOCK,
        INFO_BLOCK,
        META_TAGS_BLOCK,
        RELATED_BLOCK,
        VARIANTS_BLOCK,
    } from '@modules/products/constants/sections'
    import { RightSidebar } from '@shared/components/RightSidebar'

    const ProductAttributesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductAttributesBlock.vue')))
    const ProductConditionsBlock = markRaw(defineAsyncComponent(() => import( '@modules/products/components/ProductBlocks/ProductConditionsBlock.vue')))
    const ProductVariantsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductVariantsBlock.vue')))
    const ProductMetaTagsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductMetaTagsBlock.vue')))
    const ProductRelatedBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductRelatedBlock.vue')))
    const ProductInfoBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductInfoBlock.vue')))
    const ProductImagesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductImagesBlock.vue')))
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductCategoriesBlock.vue')))

    const AttributeEditModal = markRaw(defineAsyncComponent(() => import('@modules/products/components/modals/AttributeEditModal.vue')))
    const MetaTagEditModal = markRaw(defineAsyncComponent(() => import('@modules/products/components/modals/MetaTagEditModal.vue')))

    const { model } = useProductModel()

    const {
        categoryItems,
        variantItems,
        attributeItems,
    } = useProductsService()

    const tabs = computed<SidebarTab[]>(() => [
        {
            component: ProductInfoBlock,
            title: 'Информация о товаре',
            isActive: true,
            disabled: false,
            independent: false,
            section: INFO_BLOCK,
        },
        {
            component: ProductImagesBlock,
            title: 'Изображения товара',
            isActive: false,
            disabled: !unref(model)?.id,
            independent: true,
            section: IMAGES_BLOCK,
        },
        {
            component: ProductCategoriesBlock,
            title: 'Категории товара',
            isActive: false,
            disabled: !unref(categoryItems)?.length || !unref(model)?.id,
            independent: false,
            section: CATEGORIES_BLOCK,
        },
        {
            component: ProductAttributesBlock,
            title: 'Атрибуты товара',
            isActive: false,
            disabled: !unref(attributeItems).length || !unref(model)?.id,
            section: ATTRIBUTES_BLOCK,
            modal: AttributeEditModal,
            independent: false,
        },
        {
            component: ProductMetaTagsBlock,
            title: 'Метатеги товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: META_TAGS_BLOCK,
            modal: MetaTagEditModal,
            independent: false,
        },
        {
            component: ProductVariantsBlock,
            title: 'Варианты товара',
            isActive: false,
            disabled: !unref(variantItems)?.length || !unref(model)?.id,
            section: VARIANTS_BLOCK,
            independent: true,
        },
        {
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(categoryItems)?.length || !unref(model)?.id,
            section: RELATED_BLOCK,
            independent: true,
        },
        {
            component: ProductConditionsBlock,
            title: 'Состояние товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: CONDITIONS_BLOCK,
            independent: false,
        },
    ])

    const route = useRoute()
    const router = useRouter()

    const onSelectTab = (tab: SidebarTab) => {
        router.push({
            name: RouteNames.PRODUCT_EDIT,

            params: {
                productId: route.params.productId,
                section: tab.section,
            },
        })
    }

</script>
<template>
    <right-sidebar
        :tabs="tabs"
        @select-tab="onSelectTab"
    >
        <template #header>
            {{ model.name }}
        </template>
    </right-sidebar>
</template>
