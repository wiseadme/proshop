import { ref, unref } from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProductActionsModal } from '@modules/products/composables/use-product-actions-modal'
import { Product } from '@modules/products/model/product.model'
import { clone, getDifferences } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { IProduct, Maybe } from '@proshop/types'
import { NotUpdatableKeysMap } from '@modules/products/constants'
import { useAppNotifications } from '@shared/composables/use-app-notifications'

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

    const { noChangesNotification, changesSavedNotification } = useAppNotifications()

    const model = ref(Product.create())
    const hasChanges = ref(false)
    const isEditMode = ref(false)
    const isLoading = ref(false)
    const isSaved = ref(true)

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

        if (!unref(hasChanges)) {
            return noChangesNotification()
        }

        isSaved.value = false

        await updateProduct(updates)

        isSaved.value = true
        hasChanges.value = false
        isLoading.value = false

        setProductAsModel()

        return changesSavedNotification()
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
        let keys = Object.keys(diffs || {})

        if (keys.length) {
            const forDelete = keys.filter(key => NotUpdatableKeysMap[key])
            keys = keys.filter(key => !NotUpdatableKeysMap[key])

            forDelete.forEach(key => delete diffs[key])
        }

        return keys.length ? diffs : null
    }

    const onInit = async () => {
        await Promise.all([
            getCategories(),
            getAttributes(),
            getProducts(),
            getVariants(),
            getMetaTags(),
            getMerchant(),
            getUnits(),
        ])

        isLoading.value = false
    }

    return {
        model,
        isEditMode,
        isLoading,
        isSaved,
        hasChanges,
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
