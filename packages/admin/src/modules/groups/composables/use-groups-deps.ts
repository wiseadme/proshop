import { onMounted, unref } from 'vue'
import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
import {
    IFilterItem,
    IProduct,
    IVariant
} from '@proshop/types'
import { useLogger } from '@shared/utils/logger'

export const useGroupsDeps = () => {
    const { variants, getVariants } = useVariantsService()
    const { products, getProducts } = useProductsService()
    const { filterItems, getFilterItems } = useFilterItemsService()
    const { logError } = useLogger()

    const onSearchProducts = async (value: string): Promise<IProduct[] | void> => {
        try {
            if (value.length < 3) {
                return
            }

            return await getProducts({ name: value })
        } catch (err) {
            logError('Search results loading failed', err)
        }
    }

    const getVariantItems = async (): Promise<IVariant[] | void> => {
        try {
            if (unref(variants).length) {
                return unref(variants)
            }

            return await getVariants()
        } catch (err) {
            logError('Groups variants loading failed', err)
        }
    }

    const getOptionFilterItems = async (): Promise<IFilterItem[] | void> => {
        try {
            if (unref(filterItems).length) {
                return unref(filterItems)
            }

            return await getFilterItems()
        } catch (err) {
            logError('Groups filter items loading failed', err)
        }
    }


    onMounted(async () => {
        await Promise.all([
            getVariantItems(),
            getOptionFilterItems()
        ])
    })

    return {
        variants,
        products,
        onSearchProducts
    }
}
