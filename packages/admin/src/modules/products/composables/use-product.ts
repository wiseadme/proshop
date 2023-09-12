import {
    ref,
    unref,
    watch,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { Product } from '@modules/products/model/product.model'
import { clone, getDifferences } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { IProduct, Maybe } from '@proshop/types'
import { NotUpdatableKeysMap } from '@modules/products/constants'
// import { useAppNotifications } from '@shared/composables/use-app-notifications'

export const useProduct = createSharedComposable(() => {
    const {
        product,
        products,
        createProduct,
        // updateProduct,
        deleteProduct,
    } = useProductsService()

    // const { noChangesNotification, changesSavedNotification } = useAppNotifications()

    const model = ref<IProduct>(Product.create())
    const hasChanges = ref(false)
    const isEditMode = ref(false)
    const isLoading = ref(false)
    const isSaved = ref(true)
    const checkDiffs = (): Maybe<Partial<IProduct>> => getDifferences(unref(model), unref(product))

    const setProductModel = (value?: IProduct) => {
        model.value = value ? Product.create(clone(value)) : Product.create()
    }

    const onCreateProduct = async () => {
        isSaved.value = false

        await createProduct(unref(model))

        setProductModel()
        isSaved.value = true
    }

    // const onUpdateProduct = async (): Promise<any> => {
    //     const updates = checkDiffs()
    //
    //     hasChanges.value = !!updates
    //
    //     if (!unref(hasChanges)) {
    //         return noChangesNotification()
    //     }
    //
    //     isSaved.value = false
    //
    //     try {
    //         await updateProduct(updates!)
    //
    //         isSaved.value = true
    //         hasChanges.value = false
    //         isLoading.value = false
    //     } catch (err) {
    //         changesSavedNotification()
    //     }
    // }

    const onDeleteProduct = (product: IProduct) => deleteProduct(product)

    const onDiscardProductChanges = () => {
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

    watch(product, (newProduct) => {
        setProductModel(newProduct!)
    }, { immediate: true })

    return {
        model,
        isEditMode,
        isLoading,
        isSaved,
        hasChanges,
        products,
        product,
        setProductModel,
        getProductUpdates,
        onCreateProduct,
        // onUpdateProduct,
        onDeleteProduct,
        onDiscardProductChanges,
    }
})
