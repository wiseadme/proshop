import {
    computed,
    ref,
    unref,
} from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { TreeItem } from '@shared/composables/use-tree-view'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { ICategory } from '@proshop-app/types'

import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'


export const useProductCategories = () => {
    const { model } = useProductModel()
    const { notify } = useNotifications()

    const { updateProductCategories } = useProductsService()
    const { categories } = useCategoriesService()
    const { product, setCurrentProduct } = useProduct()

    const selectsMap = ref({})

    const categoriesMap = computed(() => unref(categories)?.reduce((map, it) => {
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

    const toggleCategory = async (ctg: TreeItem<ICategory>) => {
        const saved = !!unref(selectsMap)[ctg.id]

        saved ? unSelect(ctg) : select(ctg)
        updateModelCategories()

        const { categories } = unref(model)

        try {
            const { id } = unref(product)!
            const updatedProduct = await updateProductCategories({ id, categories })

            setCurrentProduct(updatedProduct)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        categoriesMap,
        selectsMap,
        categories,
        select,
        unSelect,
        toggleCategory,
    }
}
