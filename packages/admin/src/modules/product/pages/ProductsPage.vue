<script lang="ts">
  import { defineComponent, unref, watch } from 'vue'
  // Services
  import { useProductsService } from '@modules/product/composables/use-products-service'
  // Components
  import { ProductActionsModal } from '@modules/product/components/ProductActionsModal'
  import { ProductTable } from '@modules/product/components/ProductTable'
  import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'
  // Types
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
  import { useProductsTable } from '@modules/product/composables/use-products-table'

  export default defineComponent({
    components: {
      ProductActionsModal,
      ProductTable,
      SkeletonPreloader
    },
    setup() {
      const {
        model,
        hasChanges,
        isEditMode,
        isLoading,
        onOpenCreateProductModal,
        onOpenEditProductModal,
        onDeleteProduct,
        getProductUpdates,
        onInit
      } = useProduct()

      const { showModal } = useProductActionsModal()

      const {
        onUpdateTablePage,
        onUpdateTableRowsCount,
        onSortColumn
      } = useProductsTable()

      const { products, totalLength } = useProductsService()

      let stopWatching

      const startWatching = () => watch(model, () => {
        if (!unref(isEditMode) || unref(hasChanges)) return
        
        hasChanges.value = !!getProductUpdates()
      }, { deep: true })

      /**
       * @description запускаем watch за изменениями продукта,
       * только если он в режиме редактирования
       */
      watch(isEditMode, (state) => {
        state ? (stopWatching = startWatching()) : stopWatching()
      })

      onInit()

      return {
        model,
        showModal,
        hasChanges,
        isEditMode,
        isLoading,
        products,
        totalLength,
        onOpenCreateProductModal,
        onDeleteProduct,
        onOpenEditProductModal,
        getProductUpdates,
        onUpdateTablePage,
        onUpdateTableRowsCount,
        onSortColumn
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">
        <skeleton-preloader v-if="isLoading"/>
        <product-table
          v-else
          :products="products"
          :total="totalLength"
          @open:create-modal="onOpenCreateProductModal"
          @open:edit-modal="onOpenEditProductModal"
          @delete:product="onDeleteProduct"
          @sort:column="onSortColumn"
          @update:page="onUpdateTablePage"
          @update:rows-count="onUpdateTableRowsCount"
        />
      </v-col>
      <product-actions-modal/>
    </v-row>
  </v-layout>
</template>
