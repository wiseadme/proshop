<script setup lang="ts">
  import { toRaw, watch } from 'vue'
  // Services
  import { useProductService } from '@modules/products/service/product.service'
  // Model
  import { Product } from '@modules/products/model/product.model'
  // Helpers
  import { getDifferences } from '@shared/helpers'
  import { clone } from '@shared/helpers'
  // Components
  import { ProductActionsModal } from '@modules/products/components/ProductActionsModal'
  import { ProductTable } from '@modules/products/components/ProductTable'
  import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'
  // Types
  import { IProduct } from '@ecommerce-platform/types'

  let model = $ref<IProduct>(Product.create())
  let showCreateModal = $ref<boolean>(false)
  let hasChanges = $ref<boolean>(false)
  let isEditMode = $ref<boolean>(false)
  let loading = $ref<boolean>(true)

  const service = useProductService()
  const notUpdatableKeys = ['assets', 'image', 'variants']

  const onCreate = () => {
    service.createProduct(model)
      .then(() => showCreateModal = false)
      .then(() => model = Product.create())
  }

  const onShowProductModal = () => {
    showCreateModal = true
    isEditMode = false

    model = Product.create()

    model.attributes = clone(service.attributes)
  }

  const checkDiffs = (): Maybe<Partial<IProduct>> => {
    return getDifferences(
      toRaw(model),
      service.product
    )
  }

  const onUpdate = () => {
    const updates = checkDiffs()!

    updates._id = model._id

    service.updateProduct(updates)
      .then(() => {
        showCreateModal = false
        isEditMode = false
        hasChanges = false
      })
  }

  const onDeleteProduct = (product: IProduct) => service.deleteProduct(product)

  const onUploadVariantImage = ({ file, option }) => {
    return service.uploadProductVariantImage(file, option)
      .then((optionData) => {
        option.assets = optionData.assets
      })
  }

  const onDeleteVariantImage = ({ asset, option }) => {
    service.deleteProductVariantImage({ asset, option })
      .then(() => {
        option.assets = option.assets.reduce((assets, it) => {
          if (it._id !== asset._id) assets.push(it)
          return assets
        }, [])
      })
  }

  const onCreateVariantOption = (option) => {
    service.createVariantOption(option)
      .then(() => model.variants = service.product!.variants!)
  }

  const onUpdateVariantOption = (option) => {
    service.updateVariantOption(option)
      .then(() => model.variants = service.product!.variants)
  }

  const onDeleteVariantOption = ({ option }) => {
    service.deleteVariantOption(option)
      .then(() => {
        model.variants = service.product?.variants!
      })
  }

  const onUploadImage = (image) => {
    service.uploadProductImage(image)
      .then(() => {
        model.assets = service.product?.assets!
      })
  }

  const onDeleteImage = (asset) => {
    service.deleteProductImage(asset)
      .then(() => {
        model.assets = service.product?.assets!
      })
  }

  const onEdit = (row) => {
    service.setAsCurrent(row)
    model = Product.create(row)

    showCreateModal = true
    isEditMode = true
  }

  const onCloseModal = () => {
    if (hasChanges) {
      showCreateModal = false
    }
  }

  const onDiscard = () => {
    model = Product.create(service.product!)
    hasChanges = false
  }

  const onUpdateTablePage = async (page) => {
    service.pagination.setPaginationPage(page)
    await service.getProducts({})
  }

  const onUpdateTableRowsCount = async (count) => {
    service.pagination.setPaginationItemsCount(count)
  }

  const onSortColumn = (col) => {
    if (col.sorted) {
      service.sort.setAsc(col.key)
    } else {
      service.sort.setDesc(col.key)
    }

    setTimeout(() => service.getProducts())
  }

  const getProductUpdates = () => {
    const diffs = checkDiffs()!

    notUpdatableKeys.forEach(key => {
      if (diffs && diffs[key]) {
        delete diffs[key]
      }
    })

    const keys = diffs ? Object.keys(diffs) : null

    if (!keys || !keys.length) {
      return null
    }

    return diffs
  }

  let stopWatching

  const startWatching = () => watch(() => model, () => {
    if (!isEditMode || hasChanges) {
      return
    }

    hasChanges = !!getProductUpdates()
  }, { deep: true })

  /**
   * @description watch for product changes only
   * if product is in edit mode
   */
  watch(() => isEditMode, (state) => {
    if (state) {
      stopWatching = startWatching()
    } else {
      stopWatching()
    }
  })

  Promise.all([
    service.getCategories(),
    service.getAttributes(),
    service.getProducts(),
    service.getUnits(),
    service.getVariants()
  ])
    .then(() => loading = false)

</script>
<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">
        <skeleton-preloader v-if="loading"/>
        <product-table
          v-else
          :products="service.products"
          :total="service.totalLength"
          @open:create-modal="onShowProductModal"
          @open:edit-modal="onEdit"
          @delete:product="onDeleteProduct"
          @sort:column="onSortColumn"
          @update:page="onUpdateTablePage"
          @update:rows-count="onUpdateTableRowsCount"
        />
      </v-col>
      <product-actions-modal
        v-model="showCreateModal"
        v-model:name="model.name"
        v-model:price="model.price"
        v-model:quantity="model.quantity"
        v-model:assets="model.assets"
        v-model:image="model.image"
        v-model:url="model.url"
        v-model:unit="model.unit"
        v-model:description="model.description"
        v-model:categories="model.categories"
        v-model:seo="model.seo"
        v-model:attributes="model.attributes"
        v-model:variants="model.variants"
        v-model:conditions="model.conditions"
        :category-items="service.categories"
        :variant-items="service.variants"
        :unit-items="service.units"
        :is-edit-mode="isEditMode"
        :has-changes="hasChanges"
        @upload:image="onUploadImage"
        @delete:image="onDeleteImage"
        @upload:variant-image="onUploadVariantImage"
        @delete:variant-image="onDeleteVariantImage"
        @create:variant-option="onCreateVariantOption"
        @update:variant-option="onUpdateVariantOption"
        @delete:variant-option="onDeleteVariantOption"
        @create="onCreate"
        @update="onUpdate"
        @close="onCloseModal"
        @discard="onDiscard"
      />
    </v-row>
  </v-layout>
</template>
