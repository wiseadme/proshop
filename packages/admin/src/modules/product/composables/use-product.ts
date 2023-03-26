import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
import { Product } from '@modules/product/model/product.model'
import { getDifferences, clone } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { IProduct, Maybe } from '@ecommerce-platform/types'

export const useProduct = createSharedComposable(() => {
  const {
    product,
    products,
    attributeItems,
    getAttributes,
    getProducts,
    getCategories,
    getMetaTags,
    getUnits,
    getVariants,
    setAsCurrent,
    createProduct,
    updateProduct,
    uploadProductImage,
    deleteProductImage,
    deleteProduct,
  } = useProductsService()
  const { openActionsModal, closeActionsModal } = useProductActionsModal()

  const model = ref(Product.create())
  const hasChanges = ref(false)
  const isEditMode = ref(false)
  const isLoading = ref(false)
  const isSaved = ref(true)

  const notUpdatableKeys = [ 'assets', 'variants' ]

  const onOpenCreateProductModal = () => {
    openActionsModal()
    isEditMode.value = false
    model.value = Product.create()
    unref(model).attributes = clone(attributeItems)
  }

  const onOpenEditProductModal = (row) => {
    setAsCurrent(row)
    model.value = Product.create(clone(row))!
    isEditMode.value = true
    openActionsModal()
  }

  const checkDiffs = (): Maybe<Partial<IProduct>> => getDifferences(unref(model), unref(product))

  const onCreateProduct = () => {
    isSaved.value = false

    createProduct(unref(model))
      .then(closeActionsModal)
      .then(() => model.value = Product.create())
      .then(() => isSaved.value = true)
  }

  const onUpdateProduct = () => {
    const updates = checkDiffs()
    hasChanges.value = !!updates

    if (!unref(hasChanges)) return

    updates!._id = model.value._id
    isSaved.value = false

    updateProduct(updates)
      .then(() => {
        isSaved.value = true
        hasChanges.value = false
        isLoading.value = false
      })
  }

  const onUploadProductImage = (image) => {
    uploadProductImage(image)
      .then(() => {
        unref(model).image = unref(product)!.image
        unref(model).assets = unref(product)!.assets
      })
  }

  const onDeleteProductImage = (asset) => {
    deleteProductImage(asset)
      .then(() => {
        unref(model).image = unref(product)?.image!
        unref(model).assets = unref(product)?.assets!
      })
  }

  const onDeleteProduct = (product: IProduct) => deleteProduct(product)

  const onCloseProductModal = () => {
    if (unref(hasChanges)) return

    closeActionsModal()
  }

  const onDiscardProductChanges = () => {
    model.value = Product.create(clone(unref(product)!))
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
      getCategories(),
      getAttributes(),
      getProducts(),
      getUnits(),
      getVariants(),
      getMetaTags()
    ])

    isLoading.value = false
  }

  return {
    model,
    isEditMode,
    isLoading,
    isSaved,
    hasChanges,
    notUpdatableKeys,
    products,
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
