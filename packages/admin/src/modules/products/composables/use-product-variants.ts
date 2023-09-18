import { ref, unref } from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { IOption } from '@proshop/types'
import { clone } from '@shared/helpers'

export const useProductVariants = () => {
    const { model } = useProductModel()

    const {
        product,
        variantItems,
        createVariantOption,
        updateVariantOption,
        deleteVariantOption,
    } = useProductsService()

    const isVariantEditMode = ref(false)

    const genVariantOptionPattern = (): IOption => ({
        id: '',
        variantId: '',
        name: '',
        quantity: 0,
        price: 0,
        description: null,
        url: null,
        image: '',
    })

    const onCreateProductVariantOption = async (option: IOption) => {
        await createVariantOption(option)
        model.value.variants = clone(unref(product)!.variants!)
    }

    const onUpdateProductVariantOption = async (option: IOption) => {
        await updateVariantOption(option)
        model.value.variants = clone(unref(product)!.variants)
    }

    const onDeleteProductVariantOption = async ({ option, variant }) => {
        await deleteVariantOption({ option, variant })
        model.value.variants = clone(unref(product)?.variants!)
    }

    return {
        isVariantEditMode,
        variantItems,
        genVariantOptionPattern,
        onCreateProductVariantOption,
        onUpdateProductVariantOption,
        onDeleteProductVariantOption,
    }
}
