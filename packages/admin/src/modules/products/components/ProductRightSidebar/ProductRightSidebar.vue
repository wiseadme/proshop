<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        onBeforeMount,
        unref
    } from 'vue'

    import { useRoute, useRouter } from 'vue-router'

    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'

    import { ISidebarTab } from '@shared/composables/use-right-sidebar'

    import { RightSidebar } from '@shared/components/RightSidebar'

    import {
        ATTRIBUTES_BLOCK,
        CATEGORIES_BLOCK,
        CONDITIONS_BLOCK,
        IMAGES_BLOCK,
        INFO_BLOCK,
        META_TAGS_BLOCK,
        RELATED_BLOCK,
    } from '@modules/products/constants/sections'
    import { RouteNames } from '@modules/products/enums/route-names'

    const ProductAttributesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductAttributesBlock.vue')))
    const ProductConditionsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductConditionsBlock.vue')))
    const ProductMetaTagsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductMetaTagsBlock.vue')))
    const ProductRelatedBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductRelatedBlock.vue')))
    const ProductInfoBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductInfoBlock.vue')))
    const ProductImagesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductImagesBlock.vue')))
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductBlocks/ProductCategoriesBlock.vue')))
    const AttributeEditModal = markRaw(defineAsyncComponent(() => import('@modules/products/components/modals/AttributeEditModal.vue')))
    const MetaTagEditModal = markRaw(defineAsyncComponent(() => import('@modules/products/components/modals/MetaTagEditModal.vue')))

    const { model } = useProductModel()
    const { attributeItems } = useProductsService()
    const { categories, getCategories } = useCategoriesService()

    const tabs = computed<ISidebarTab[]>(() => ([
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
            disabled: !unref(categories)?.length || !unref(model)?.id,
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
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(categories)?.length || !unref(model)?.id,
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
    ]))

    const route = useRoute()
    const router = useRouter()

    const onSelectTab = (tab: ISidebarTab) => {
        router.push({
            name: RouteNames.PRODUCT_EDIT,

            params: {
                sku: route.params.sku,
                section: tab.section,
            },
        })
    }

    onBeforeMount(() => {
        if (!unref(categories)?.length) getCategories()
    })

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
