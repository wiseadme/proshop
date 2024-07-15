import {
    DeepReadonly,
    Ref,
    ref
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import type { IProduct } from '@proshop-app/types'

interface IUseProduct {
    product: DeepReadonly<Ref<Maybe<IProduct>>>

    setCurrentProduct(item: Maybe<IProduct>): void
}

export const useProduct = createSharedComposable((): IUseProduct => {
    const product = ref<Maybe<IProduct>>(null)

    const setCurrentProduct = (item: Maybe<IProduct>) => {
        product.value = item
    }

    return {
        product: product as DeepReadonly<Ref<Maybe<IProduct>>>,
        setCurrentProduct
    }
})
