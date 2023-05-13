import { ref, unref } from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { ICategory } from '@ecommerce-platform/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductCategories = createSharedComposable(() => {
    const { model } = useProduct()

    const categoriesMap = ref<Map<string, ICategory>>(new Map())

    const toggleCategory = (ctg: ICategory) => {
        if (unref(categoriesMap).get(ctg._id)) {
            unref(categoriesMap).delete(ctg._id)
        } else {
            unref(categoriesMap).set(ctg._id, ctg)
        }

        unref(model).categories = Array.from(unref(categoriesMap).values())
    }

    return {
        categoriesMap,
        toggleCategory
    }
})
