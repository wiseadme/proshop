import { ref, unref } from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { ICategory } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductCategories = createSharedComposable(() => {
    const { model } = useProduct()
    const categoriesMap = ref({})

    const toggleCategory = (ctg: ICategory) => {
        if (unref(categoriesMap)[ctg.id]) {
            delete unref(categoriesMap)[ctg.id]
        } else {
            unref(categoriesMap)[ctg.id] = ctg
        }

        unref(model).categories = Object.values(unref(categoriesMap)) as ICategory[]
    }

    return {
        categoriesMap,
        toggleCategory,
    }
})
