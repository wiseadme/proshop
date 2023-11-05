import {
    computed,
    ref,
    unref
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { clone } from '@shared/helpers'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'
import {
    IOption,
    IProduct,
    IVariant
} from '@proshop/types'

export const useProductVariants = () => {
    const { model } = useProductModel()

    const {
        product,
        variantItems,
        addNewVariantOption,
        updateVariantOption,
        deleteVariantOption,
    } = useProductsService()

    const { notify } = useNotifications()

    const isVariantEditMode = ref(false)

    const genVariantOptionPattern = (): IOption => ({
        id: '',
        variantId: '',
        ownerId: '',
        product: null,
        name: '',
        quantity: 0,
        price: 0,
        order: 0,
        description: null,
        url: null,
        image: '',
    })

    const mergedVariants = computed<IVariant[]>(() => {
        return Object.values(unref(model).variants.concat(unref(variantItems)).reduce((map, variant) => {
            if (!map[variant.id]){
                map[variant.id] = variant
            }

            return map
        }, {}))
    })

    const onCreateProductVariantOption = async (option: IOption): Promise<void> => {
        option.product = (option.product as IProduct)?.id ?? null

        try {
            await addNewVariantOption(option)
            model.value.variants = clone(unref(product)!.variants!)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateProductVariantOption = async (option: IOption): Promise<void> => {
        try {
            await updateVariantOption(option)
            model.value.variants = clone(unref(product)!.variants)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteProductVariantOption = async ({ option, variant }): Promise<void> => {
        try {
            await deleteVariantOption({ option, variant })
            model.value.variants = clone(unref(product)?.variants!)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }


    return {
        variantItems,
        isVariantEditMode,
        mergedVariants,
        genVariantOptionPattern,
        onCreateProductVariantOption,
        onUpdateProductVariantOption,
        onDeleteProductVariantOption,
    }
}
