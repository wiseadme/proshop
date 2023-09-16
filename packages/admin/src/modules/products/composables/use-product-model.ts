import { ref, watch } from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { Product } from '@modules/products/model/product.model'
import { clone } from '@shared/helpers'
import { IProduct } from '@proshop/types'

export const useProductModel = createSharedComposable(() => {
    const { product } = useProductsService()

    const model = ref<IProduct>(Product.create())

    const setProductModel = (value?: IProduct) => {
        model.value = value ? Product.create(clone(value)) : Product.create()
    }

    watch(product, (newProduct) => {
        setProductModel(newProduct!)
    }, { immediate: true })

    return {
        model,
        setProductModel,
    }
})
