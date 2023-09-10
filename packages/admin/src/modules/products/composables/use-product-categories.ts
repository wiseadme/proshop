import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProduct } from '@modules/products/composables/use-product'
import { ICategory } from '@proshop/types'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useAppNotifications } from '@shared/composables/use-app-notifications'

export const useProductCategories = () => {
    const { model } = useProduct()
    const { changesSavedNotification, savingErrorNotification } = useAppNotifications()

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
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
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
