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
import {Option} from '@modules/products/model/option.model'
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

    const isEditMode = ref(false)
    const optionProductLink = ref(null)
    const optionModel = ref<IOption>(Option.create())
    const currentVariant = ref<Maybe<IVariant>>(null)

    const mergedVariants = computed<IVariant[]>(() => {
        return Object.values(unref(model).variants.concat(unref(variantItems)).reduce((map, variant) => {
            map[variant.id] ??= variant

            return map
        }, {}))
    })

    const setCurrentVariant = (variant: Maybe<IVariant>) => {
        currentVariant.value = variant
        optionModel.value = Option.create()

        unref(optionModel).variantId = unref(currentVariant)!.id
        isEditMode.value = false
    }


    const clearVariantOptionForm = () => {
        isEditMode.value = false
        optionProductLink.value = null
        optionModel.value = Option.create()
    }

    const onCreateVariantOption = async (option: IOption): Promise<void> => {
        option.product = (option.product as IProduct)?.id ?? null

        try {
            await addNewVariantOption(option)
            unref(model).variants = clone(unref(product)!.variants!)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateVariantOption = async (option: IOption): Promise<void> => {
        try {
            await updateVariantOption(option)
            unref(model).variants = clone(unref(product)!.variants)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteVariantOption = async ({ option, variant }): Promise<void> => {
        try {
            await deleteVariantOption({ option, variant })
            unref(model).variants = clone(unref(product)?.variants!)

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    return {
        optionModel,
        variantItems,
        mergedVariants,
        isEditMode,
        optionProductLink,
        currentVariant,
        setCurrentVariant,
        clearVariantOptionForm,
        onCreateVariantOption,
        onUpdateVariantOption,
        onDeleteVariantOption,
    }
}
