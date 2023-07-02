import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
import { Product } from '@modules/product/model/product.model'
import { clone, getDifferences } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { IProduct, Maybe } from '@proshop/types'

export const useProduct = createSharedComposable(() => {
    const {
        product,
        products,
        getMerchant,
        getUnits,
        getAttributes,
        getProducts,
        getCategories,
        getMetaTags,
        getVariants,
        setAsCurrent,
        createProduct,
        updateProduct,
        uploadProductImage,
        deleteProductImage,
        deleteProduct,
    } = useProductsService()

    const {
        openActionsModal,
        closeActionsModal,
    } = useProductActionsModal()

    const model = ref(Product.create())
    const hasChanges = ref(false)
    const isEditMode = ref(false)
    const isLoading = ref(false)
    const isSaved = ref(true)

    const notUpdatableKeys = ['assets', 'variants']

    const setProductAsModel = () => model.value = Product.create(clone(unref(product)!))

    const onOpenCreateProductModal = () => {
        openActionsModal()

        isEditMode.value = false
        model.value = Product.create()

        setAsCurrent(null)
    }

    const onOpenEditProductModal = (row) => {
        setAsCurrent(row)

        setProductAsModel()
        isEditMode.value = true

        openActionsModal()
    }

    const checkDiffs = (): Maybe<Partial<IProduct>> => getDifferences(unref(model), unref(product))

    const onCreateProduct = async () => {
        isSaved.value = false

        await createProduct(unref(model))

        closeActionsModal()

        model.value = Product.create()
        isSaved.value = true
    }

    const onUpdateProduct = async () => {
        const updates = checkDiffs()

        hasChanges.value = !!updates

        if (!unref(hasChanges)) return

        updates!._id = model.value._id
        isSaved.value = false

        await updateProduct(updates)

        isSaved.value = true
        hasChanges.value = false
        isLoading.value = false

        setProductAsModel()
    }

    const onUploadProductImage = async (image) => {
        await uploadProductImage(image)

        unref(model).image = unref(product)!.image
        unref(model).assets = clone(unref(product)!.assets)
    }

    const onDeleteProductImage = async (asset) => {
        await deleteProductImage(asset)

        unref(model).image = unref(product)?.image!
        unref(model).assets = clone(unref(product)?.assets!)
    }

    const onDeleteProduct = (product: IProduct) => deleteProduct(product)

    const onCloseProductModal = () => {
        if (unref(hasChanges)) return

        isEditMode.value = false

        closeActionsModal()
    }

    const onDiscardProductChanges = () => {
        setProductAsModel()
        hasChanges.value = false
    }

    const getProductUpdates = () => {
        const diffs = checkDiffs()!

        // notUpdatableKeys.forEach(key => diffs && diffs[key] && (delete diffs[key]))
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
            getMetaTags(),
            getMerchant()
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
        product,
        onInit,
        setProductAsModel,
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
