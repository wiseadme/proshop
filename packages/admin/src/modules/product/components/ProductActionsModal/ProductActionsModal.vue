<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        ref,
        unref
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
    const ProductCategoriesBlock = markRaw(defineAsyncComponent(() => import('./ProductCategoriesBlock.vue')))

    const {
        isSaved,
        model,
        isEditMode,
        hasChanges,
        onUpdateProduct,
        onCreateProduct,
        onCloseProductModal,
        onDiscardProductChanges,
    } = useProduct()

    const { categoryItems } = useProductsService()
    const { showModal, closeActionsModal } = useProductActionsModal()

    const tabs = ref([
        {
            component: ProductInfoBlock,
            title: 'Информация о товаре',
            isActive: true,
            disabled: false
        },
        {
            component: ProductCategoriesBlock,
            title: 'Категории товара',
            isActive: false,
            disabled: false
        },
        {
            component: ProductAttributesBlock,
            title: 'Атрибуты товара',
            isActive: false,
            disabled: false
        },
        {
            component: ProductMetaTagsBlock,
            title: 'Метатеги товара',
            isActive: false,
            disabled: false
        },
        {
            component: ProductVariantsBlock,
            title: 'Варианты товара',
            isActive: false,
            disabled: !unref(model).id
        },
        {
            component: ProductRelatedBlock,
            title: 'Рекомендуемые товары',
            isActive: false,
            disabled: !unref(categoryItems)?.length
        },
        {
            component: ProductConditionsBlock,
            title: 'Состояние товара',
            isActive: false,
            disabled: false
        },
    ])
    const currentTab = ref(unref(tabs)[0])

    const modalHeader = computed<string>(() => `${ (unref(isEditMode) ? 'Редактирование' : 'Создание') } продукта`)

    const onSubmit = (validate) => {
        validate().then(unref(isEditMode) ? onUpdateProduct : onCreateProduct)
    }

    const setTab = (tab) => {
        unref(currentTab).isActive = false
        tab.isActive = true
        currentTab.value = tab
    }

    const closeModal = () => {
        onCloseProductModal()
        closeActionsModal()
    }

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
                class="app-border-radius white"
                style="overflow: hidden"
            >
                <v-row>
                    <v-col
                        cols="2"
                        class="secondary"
                    >
                    </v-col>
                    <v-col
                        cols="10"
                        style="height: 60px"
                        class="d-flex align-center justify-start elevation-2 pl-4"
                    >
                        <h3>{{ modalHeader }} {{ model.name }}</h3>
                    </v-col>
                </v-row>
                <v-row
                    no-gutter
                    style="height: 80vh"
                >
                    <v-col
                        cols="2"
                        class="secondary white--text"
                    >
                        <v-list
                            active
                            active-class="white secondary--text"
                            color="secondary white--text"
                        >
                            <v-list-item
                                v-for="tab in tabs"
                                v-slot="{active}"
                                :key="tab.title"
                                @click="setTab(tab)"
                            >
                                <v-list-item-icon>
                                    <v-icon
                                        :icon="active.value ? 'fas fa-check' : 'fas fa-circle'"
                                    />
                                </v-list-item-icon>
                                <v-list-item-title>
                                    {{ tab.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col
                        cols="10"
                        style="overflow-y: scroll; overflow-x: hidden; max-height: calc(80vh)"
                    >
                        <component :is="currentTab.component"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="2"
                        class="secondary py-4"
                    ></v-col>
                    <v-col
                        cols="10"
                        class="py-4 pl-4 elevation-5"
                    >
                        <v-button
                            color="primary"
                            class="app-border-radius"
                            elevation="3"
                            width="120"
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
                        <v-button
                            v-if="isEditMode"
                            class="ml-2 app-border-radius"
                            elevation="3"
                            color="red darken-2"
                            :disabled="!hasChanges"
                            @click="onDiscardProductChanges"
                        >
                            сбросить изменения
                        </v-button>
                    </v-col>
                </v-row>
            </div>
        </v-form>
    </v-modal>
</template>
<style lang="scss">
  @import "styles/ProductActionsModal";

  .active--section {
      position: relative;
      transition: all .3s linear;

      &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 30px;
          right: 0;
          bottom: 0;
          background: #fff;
          border-top-left-radius: 25px;
          border-bottom-left-radius: 25px;
          z-index: 0;
      }
  }
</style>
