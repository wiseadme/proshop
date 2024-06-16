import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
import {
    IFilterGroup,
    IFilterItem,
    IProduct,
    IVariant
} from '@proshop/types'
import { useLogger } from '@shared/utils/logger'

export const useGroupsDeps = () => {
    const { variants, getVariants } = useVariantsService()
    const { products, getProducts } = useProductsService()
    const { filterItems, getFilterItems } = useFilterItemsService()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
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
            return await getVariants()
        } catch (err) {
            logError('Groups variants loading failed', err)
        }
    }

    const getOptionFilterGroups = async (params = {}): Promise<IFilterGroup[] | void> => {
        try {
            return await getFilterGroupItems(params)
        } catch (err) {
            logError('Filter groups items loading failed', err)
        }
    }

    const getOptionFilterItems = async (params = {}): Promise<IFilterItem[] | void> => {
        try {
            return await getFilterItems(params)
        } catch (err) {
            logError('Groups filter items loading failed', err)
        }
    }

    return {
        variants,
        products,
        filterItems,
        filterGroups,
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
        onSearchProducts
    }
}
