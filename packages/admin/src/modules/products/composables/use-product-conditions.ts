import { useProductModel } from '@modules/products/composables/use-product-model'

export const useProductConditions = () => {
    const { model } = useProductModel()

    return {
        model
    }
}
