<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        ref,
        unref,
        watch
    } from 'vue'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
    // Components
    const ProductAttributesBlock = markRaw(defineAsyncComponent(() => import('./ProductAttributesBlock.vue')))
    const ProductConditionsBlock = markRaw(defineAsyncComponent(() => import( './ProductConditionsBlock.vue')))
    const ProductVariantsBlock = markRaw(defineAsyncComponent(() => import('./ProductVariantsBlock.vue')))
    const ProductMetaTagsBlock = markRaw(defineAsyncComponent(() => import('./ProductMetaTagsBlock.vue')))
    const ProductRelatedBlock = markRaw(defineAsyncComponent(() => import('./ProductRelatedBlock.vue')))
    const ProductInfoBlock = markRaw(defineAsyncComponent(() => import('./ProductInfoBlock.vue')))
    const ProductImagesBlock = markRaw(defineAsyncComponent(() => import('./ProductImagesBlock.vue')))
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('./ProductCategoriesBlock.vue')))

    const {
        isSaved,
        model,
        isEditMode,
        // hasChanges,
        onUpdateProduct,
        onCreateProduct,
        onCloseProductModal,
        // onDiscardProductChanges,
    } = useProduct()

    const { categoryItems } = useProductsService()
    const { showModal, closeActionsModal } = useProductActionsModal()

    const tabs = ref([
        {
            component: ProductInfoBlock,
            title: 'Информация о товаре',
            isActive: true,
            disabled: false,
            independent: false
        },
        {
            component: ProductImagesBlock,
            title: 'Изображения товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: true,
        },
        {
            component: ProductCategoriesBlock,
            title: 'Категории товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: false
        },
        {
            component: ProductAttributesBlock,
            title: 'Атрибуты товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: false
        },
        {
            component: ProductMetaTagsBlock,
            title: 'Метатеги товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: false
        },
        {
            component: ProductVariantsBlock,
            title: 'Варианты товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: true
        },
        {
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(model).id || !unref(categoryItems)?.length,
            independent: false
        },
        {
            component: ProductConditionsBlock,
            title: 'Состояние товара',
            isActive: false,
            disabled: !unref(model).id,
            independent: false
        },
    ])
    const currentTab = ref(0)

    const modalHeader = computed<string>(() => `${ (unref(isEditMode) ? 'Редактирование' : 'Создание') } продукта`)

    const onSubmit = (validate) => {
        validate().then(unref(isEditMode) ? onUpdateProduct : onCreateProduct)
    }

    const setTab = (index: number) => {
        if (unref(tabs)[index].disabled) return

        unref(tabs)[unref(currentTab)].isActive = false
        unref(tabs)[index].isActive = true
        currentTab.value = index
    }

    const closeModal = () => {
        onCloseProductModal()
        closeActionsModal()
    }

    watch(() => unref(model).id, (id) => {
        unref(tabs).forEach((tab, i) => {
            if (unref(currentTab) !== i) {
                tab.disabled = !id
            }
        })
    })

    watch(showModal, (state) => {
        if (state) {
            currentTab.value = 0
        }
    })

</script>
<template>
    <v-modal
        v-model="showModal"
        transition="scale-in"
        width="90%"
        overlay
    >
        <v-form v-slot="{validate}">
            <div
                class="app-border-radius grey lighten-3"
                style="overflow: hidden"
            >
                <v-row
                    no-gutter
                    style="height: 90vh"
                >
                    <v-col
                        cols="2"
                        class="white secondary--text elevation-5 d-flex flex-column justify-start"
                    >
                        <v-row
                            class="mb-3 pa-2"
                            style="flex-basis: 60px"
                        >
                            <v-col
                                style="height: 60px;"
                                class="primary white--text d-flex align-center justify-start align-self-start pl-4 app-border-radius elevation-2"
                            >
                                <h5>{{ modalHeader }} {{ model.name }}</h5>
                            </v-col>
                        </v-row>
                        <v-row no-gutter>
                            <v-col>
                                <v-list
                                    v-model:value="currentTab"
                                    active-class="primary white--text"
                                    color="white"
                                >
                                    <v-list-item
                                        v-for="(tab, i) in tabs"
                                        v-slot="{active}"
                                        :key="tab.title"
                                        class="secondary--text"
                                        @click="setTab(i)"
                                    >
                                        <v-list-item-icon>
                                            <v-icon
                                                v-if="tab.disabled"
                                                size="12"
                                            >
                                                fas fa-lock
                                            </v-icon>
                                            <v-icon
                                                v-else
                                                size="12"
                                            >
                                                {{ active.value ? 'fas fa-check' : 'fas fa-circle' }}
                                            </v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ tab.title }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle v-if="tab.disabled">
                                                Сначала создайте товар
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                class="py-4 pl-4"
                                style="align-self: end"
                            >
                                <v-button
                                    color="primary"
                                    class="app-border-radius"
                                    elevation="3"
                                    width="120"
                                    :disabled="tabs[currentTab].independent"
                                    :loading="!isSaved"
                                    @click="onSubmit(validate)"
                                >
                                    сохранить
                                </v-button>
                                <v-button
                                    color="warning"
                                    class="ml-2 app-border-radius"
                                    width="120"
                                    elevation="3"
                                    @click="closeModal"
                                >
                                    отмена
                                </v-button>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="10">
                        <v-row no-gutter>
                            <v-col style="overflow-y: auto; overflow-x: hidden; max-height: 90vh">
                                <component :is="tabs[currentTab].component"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-form>
    </v-modal>
</template>
<style lang="scss">
  @import "styles/ProductActionsModal";
</style>
