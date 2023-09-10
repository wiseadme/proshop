<script lang="ts" setup>
    import {
        DefineComponent,
        computed,
        defineAsyncComponent,
        markRaw,
        unref,
    } from 'vue'
    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { useProductRightSidebar } from '@modules/products/composables/use-product-right-sidebar'
    import { useRoute, useRouter } from 'vue-router'
    import { RouteNames } from '@modules/products/enums/route-names'

    const ProductAttributesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductAttributesBlock.vue')))
    const ProductConditionsBlock = markRaw(defineAsyncComponent(() => import( '@modules/products/components/ProductActions/ProductConditionsBlock.vue')))
    const ProductVariantsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductVariantsBlock.vue')))
    const ProductMetaTagsBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductMetaTagsBlock.vue')))
    const ProductRelatedBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductRelatedBlock.vue')))
    const ProductInfoBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductInfoBlock.vue')))
    const ProductImagesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductImagesBlock.vue')))
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('@modules/products/components/ProductActions/ProductCategoriesBlock.vue')))

    const { model } = useProduct()
    const { categoryItems } = useProductsService()
    const { activeItem, setActiveNavItem } = useProductRightSidebar()

    interface Tab {
        component: InstanceType<DefineComponent<{}, {}, any>>
        title: string
        isActive: boolean
        disabled: boolean
        independent: boolean
        section: string
    }

    const tabs = computed<Tab[]>(() => [
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
            disabled: !unref(model)?.id,
            independent: true,
            section: 'images',
        },
        {
            component: ProductCategoriesBlock,
            title: 'Категории товара',
            isActive: false,
            disabled: !unref(model)?.id,
            independent: false,
            section: 'categories',
        },
        {
            component: ProductAttributesBlock,
            title: 'Атрибуты товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: 'attributes',
            independent: false,
        },
        {
            component: ProductMetaTagsBlock,
            title: 'Метатеги товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: 'meta-tags',
            independent: false,
        },
        {
            component: ProductVariantsBlock,
            title: 'Варианты товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: 'variants',
            independent: true,
        },
        {
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(model)?.id || !unref(categoryItems)?.length,
            section: 'related',
            independent: true,
        },
        {
            component: ProductConditionsBlock,
            title: 'Состояние товара',
            isActive: false,
            disabled: !unref(model)?.id,
            section: 'conditions',
            independent: false,
        },
    ])

    const route = useRoute()
    const router = useRouter()

    const ind = unref(tabs).findIndex(tab => route.params.section === tab.section) || 0

    setActiveNavItem(unref(tabs)[ind || 0])

    const onClick = (tab: Tab) => {
        activeItem.value = tab

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
    <div
        style="height: calc(100vh - 76px);"
        class="product-sidebar grey lighten-2 sticky white--text app-border-radius d-flex flex-column elevation-5 pt-2"
    >
        <v-card
            v-if="model"
            color="secondary"
            style="width: auto; font-size: .8rem"
            class="pa-2 pb-3 mx-2 app-border-radius"
            elevation="2"
        >
            {{ model.name }}
        </v-card>
        <v-list
            class="context-menu mt-2 pa-2 app-border-radius"
            color="secondary"
        >
            <v-list-item
                v-for="tab in tabs"
                :key="tab.title"
                class="context-menu__item app-border-radius mb-1"
                :class="[activeItem.title === tab.title ? 'success white--text': 'white--text']"
                @click="onClick(tab)"
            >
                <v-list-item-title>
                    {{ tab.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>
<style lang="scss">
    .sticky {
        position: sticky;
        top: calc(#{$header-height} + #{$page-top-padding})
    }

    .context-menu {
        height: 100%;
        &__item {
            cursor: pointer;
        }

        &__buttons {
            justify-self: end;
        }
    }
</style>
