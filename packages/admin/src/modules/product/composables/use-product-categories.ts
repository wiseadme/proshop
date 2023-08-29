import { ref, unref } from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { ICategory } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductCategories = createSharedComposable(() => {
    const { model } = useProduct()
    const categoriesMap = ref({})

    const select = (ctg: ICategory) => {
        unref(categoriesMap)[ctg.id] = ctg
    }

    const unSelect = (ctg: ICategory) => {
        delete unref(categoriesMap)[ctg.id]
    }

    const updateModelCategories = () => {
        unref(model).categories = Object.values(unref(categoriesMap)) as ICategory[]
    }

    const toggleCategory = (ctg: ICategory) => {
        if (unref(categoriesMap)[ctg.id]) {
            unSelect(ctg)
        } else {
            select(ctg)
        }

        updateModelCategories()
    }

    return {
        categoriesMap,
        select,
        unSelect,
        toggleCategory,
    }
})
