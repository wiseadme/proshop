import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { ICategory } from '@proshop/types'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductCategories = () => {
    const { model } = useProductModel()
    const { notify } = useNotifications()

    const { categoryItems, updateProductCategories } = useProductsService()
    const selectsMap = ref({})

    const categoriesMap = computed(() => unref(categoryItems)?.reduce((map, it) => {
        map[it.id] = it

        return map
    }))

    const select = (ctg: ICategory) => {
        unref(selectsMap)[ctg.id] = ctg
    }

    const unSelect = (ctg: ICategory) => {
        delete unref(selectsMap)[ctg.id]
    }

    const updateModelCategories = () => {
        unref(model).categories = Object.values(unref(selectsMap)) as ICategory[]
    }

    const toggleCategory = async (ctg: ICategory) => {
        const saved = !!unref(selectsMap)[ctg.id]

        saved ? unSelect(ctg) : select(ctg)
        updateModelCategories()

        const { categories } = unref(model)

        try {
            await updateProductCategories({ categories })

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        categoriesMap,
        selectsMap,
        select,
        unSelect,
        toggleCategory,
    }
}
