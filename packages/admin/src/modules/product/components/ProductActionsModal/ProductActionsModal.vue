<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductsService } from '@modules/product/composables/use-products-service'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
  // Components
  import ProductAttributesBlock from './ProductAttributesBlock.vue'
  import ProductConditionsBlock from './ProductConditionsBlock.vue'
  import ProductVariantsBlock from './ProductVariantsBlock.vue'
  import ProductMetaTagsBlock from './ProductMetaTagsBlock.vue'
  import ProductRelatedBlock from './ProductRelatedBlock.vue'
  import ProductInfoBlock from './ProductInfoBlock.vue'
  import ProductCategoriesBlock from './ProductCategoriesBlock.vue'

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

  const computedModalHeader = computed<string>(() => `${ (unref(isEditMode) ? 'Редактирование' : 'Создание') } продукта`)

  const onSubmit = (validate) => {
    validate().then(unref(isEditMode) ? onUpdateProduct : onCreateProduct)
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
      <v-card
        color="white"
        width="100%"
        class="modal-card app-border-radius elevation-5"
      >
        <v-card-title class="modal-card-title secondary--text py-4">
          <h3>{{ computedModalHeader }}</h3>
        </v-card-title>
        <v-card-content
          width="100%"
          style="height: 80vh; max-height: 80vh; overflow: auto"
        >
          <product-info-block class="product-modal-block"/>
          <product-categories-block class="product-modal-block mt-6"/>
          <product-attributes-block class="product-modal-block mt-6"/>
          <product-meta-tags-block class="product-modal-block mt-6"/>
          <product-variants-block class="product-modal-block mt-6"/>
          <product-related-block
            v-if="categoryItems"
            class="mt-2 product-modal-block mt-6"
          />
          <product-conditions-block
            v-model:conditions="model.conditions"
            class="mt-2 product-modal-block mt-6"
          />
        </v-card-content>
        <v-card-actions>
          <v-button
            color="primary"
            elevation="3"
            width="120"
            :disabled="!hasChanges && isEditMode"
            :loading="!isSaved"
            rounded
            @click="onSubmit(validate)"
          >
            сохранить
          </v-button>
          <v-button
            color="warning"
            class="ml-4"
            width="120"
            elevation="3"
            rounded
            :disabled="hasChanges"
            @click="closeModal"
          >
            отмена
          </v-button>
          <v-button
            v-if="isEditMode"
            class="ml-4"
            elevation="3"
            color="red darken-2"
            rounded
            :disabled="!hasChanges"
            @click="onDiscardProductChanges"
          >
            сбросить изменения
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-modal>
</template>
<style lang="scss">
  @import "styles/ProductActionsModal";
</style>
