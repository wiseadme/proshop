import { unref } from 'vue'
import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
import { useGroupsService } from '@modules/groups/composables/use-groups-service'
import { useLogger } from '@shared/utils/logger'
import { useGroupModel } from '@modules/groups/composables/use-group-model'
import {
    IFilterGroup,
    IFilterItem,
    IProduct,
    IVariant
} from '@proshop/types'

export const useGroups = () => {
    const { readOnlyGroups, createGroup } = useGroupsService()
    const { variants, getVariants } = useVariantsService()
    const { products, getProducts } = useProductsService()
    const { filterItems, getFilterItems } = useFilterItemsService()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { model } = useGroupModel()
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

    const onCreateGroup = async (validate: () => Promise<boolean>) => {
        try {
            await validate()
            model.value = await createGroup(unref(model))
            console.log(model.value)
        } catch (err) {
            logError('Groups filter items loading failed', err)
        }
    }

    return {
        variants,
        products,
        filterItems,
        filterGroups,
        groups: readOnlyGroups,
        onCreateGroup,
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
        onSearchProducts
    }
}
