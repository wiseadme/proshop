import {
    computed,
    ref,
    unref,
    watch,
} from 'vue'

import { useProduct } from '@modules/products/composables/use-product'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { Product } from '@modules/products/model/product.model'

import type { IProduct } from '@proshop-app/types'

import { clone } from '@shared/helpers'

export const useProductModel = createSharedComposable(() => {
    const { product } = useProduct()

    const model = ref<IProduct>(Product.create())

    const isEditMode = computed(() => Boolean(unref(model).id))

    const sortOrderedItems = () => {
        unref(model).seo.metatags.sort((a, b) => a.order - b.order)
        unref(model).attributes.sort((a, b) => a.order - b.order)
    }

    const setProductModel = (value: Maybe<IProduct>) => {
        model.value = value ? Product.create(clone(value)) : Product.create()
        sortOrderedItems()
    }

    const modelMetaTags = computed(() => unref(model).seo.metatags)

    watch(product, (newProduct) => {
        setProductModel(newProduct! as IProduct)
    }, { immediate: true })

    return {
        model,
        modelMetaTags,
        isEditMode,
        setProductModel,
    }
})
