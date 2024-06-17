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
    IGroup,
    IGroupOption,
    IProduct,
    IVariant
} from '@proshop/types'
import { Group } from '@modules/groups/model/group.model'

export const useGroups = () => {
    const { readOnlyGroups, createGroup, updateGroup } = useGroupsService()
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

    const onCreateGroup = async () => {
        try {
            model.value = Group.create(await createGroup(unref(model)))
        } catch (err) {
            logError('Groups filter items loading failed', err)
        }
    }

    const onCreateGroupOption = async (option: IGroupOption) => {
        try {
            const payload: Partial<IGroup> = {
                id: unref(model).id,
                options: [...unref(model).options, option]
            }

            const updated = await updateGroup(payload)

            model.value = Group.create(updated)
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
        onSearchProducts,
        onCreateGroupOption
    }
}
