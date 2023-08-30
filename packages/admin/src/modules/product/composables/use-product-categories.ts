import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { ICategory } from '@proshop/types'
import { useProductsService } from '@modules/product/composables/use-products-service'
import {
    TreeItem,
    buildTreeItems,
    clone
} from '@shared/helpers'

export const useProductCategories = () => {
    const { model } = useProduct()
    const { categoryItems } = useProductsService()
    const selectsMap = ref({})

    const categoriesTree = computed<TreeItem<ICategory>[]>(() => buildTreeItems(clone(unref(categoryItems)) || []))
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

    const toggleCategory = (ctg: ICategory) => {
        if (unref(selectsMap)[ctg.id]) {
            unSelect(ctg)
        } else {
            select(ctg)
        }

        updateModelCategories()
    }

    return {
        categoriesTree,
        categoriesMap,
        selectsMap,
        select,
        unSelect,
        toggleCategory,
    }
}
