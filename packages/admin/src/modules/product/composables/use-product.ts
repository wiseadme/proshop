import {computed, ref, unref } from 'vue'
import { useProductService } from '@modules/product/service/product.service'
import { useActionsModal } from '@modules/product/composables/use-actions-modal'
import { Product } from '@modules/product/model/product.model'
import { getDifferences, clone } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { IAttribute, ICategory, IMetaTag, IProduct, IUnit, IVariant, Maybe } from '@ecommerce-platform/types'

export const useProduct = createSharedComposable(() => {
  const service = useProductService()
  const { openActionsModal, closeActionsModal } = useActionsModal()

  const model = ref(Product.create())
  const hasChanges = ref(false)
  const isEditMode = ref(false)
  const isLoading = ref(false)

  const notUpdatableKeys = [ 'assets', 'variants' ]

  const attributeItems = computed<Maybe<IAttribute[]>>(() => service.attributes)
  const categoryItems = computed<Maybe<ICategory[]>>(() => service.categories)
  const variantItems = computed<Maybe<IVariant[]>>(() => service.variants)
  const metatagItems = computed<Maybe<IMetaTag[]>>(() => service.metaTags)
  const unitItems = computed<Maybe<IUnit[]>>(() => service.units)

  const onOpenCreateProductModal = () => {
    openActionsModal()
    isEditMode.value = false
    model.value = Product.create()
    model.value.attributes = clone(service.attributes)
  }

  const checkDiffs = (): Maybe<Partial<IProduct>> => {
    return getDifferences(unref(model), service.product)
  }

  const onCreateProduct = () => {
    service.createProduct(unref(model))
      .then(closeActionsModal)
      .then(() => model.value = Product.create())
  }

  const onUpdateProduct = () => {
    const updates = checkDiffs()!
    updates._id = model.value._id

    service.updateProduct(updates)
      .then(() => {
        closeActionsModal()
        isEditMode.value = false
        hasChanges.value = false
      })
  }

  const onUploadProductImage = (image) => {
    service.uploadProductImage(image)
      .then(() => {
        model.value.image = service.product!.image
        model.value.assets = service.product!.assets
      })
  }

  const onDeleteProductImage = (asset) => {
    service.deleteProductImage(asset)
      .then(() => {
        model.value.image = service.product?.image!
        model.value.assets = service.product?.assets!
      })
  }

  const onOpenEditProductModal = (row) => {
    service.setAsCurrent(row)
    model.value = Product.create(clone(service.product))!
    isEditMode.value = true
    openActionsModal()
  }

  const onDeleteProduct = (product: IProduct) => service.deleteProduct(product)

  const onCloseProductModal = () => {
    if (unref(hasChanges)) return

    closeActionsModal()
  }

  const onDiscardProductChanges = () => {
    model.value = Product.create(service.product!)
    hasChanges.value = false
  }

  const getProductUpdates = () => {
    const diffs = checkDiffs()!

    notUpdatableKeys.forEach(key => diffs && diffs[key] && (delete diffs[key]))

    const keys = diffs ? Object.keys(diffs) : null

    if (!keys || !keys.length) return null

    return diffs
  }

  const onInit = async () => {
    await Promise.all([
      service.getCategories(),
      service.getAttributes(),
      service.getProducts(),
      service.getUnits(),
      service.getVariants(),
      service.getMetaTags()
    ])

    isLoading.value = false
  }

  return {
    model,
    isEditMode,
    isLoading,
    hasChanges,
    notUpdatableKeys,
    unitItems,
    categoryItems,
    variantItems,
    attributeItems,
    metatagItems,
    onInit,
    getProductUpdates,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct,
    onUploadProductImage,
    onDeleteProductImage,
    onOpenEditProductModal,
    onOpenCreateProductModal,
    onCloseProductModal,
    onDiscardProductChanges,
  }
})
