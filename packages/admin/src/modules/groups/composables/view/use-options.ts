import {
    computed,
    ref,
    unref
} from 'vue'

import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
import { useGroupsService } from '@modules/groups/composables/services/use-groups-service'
import { useOptionsService } from '@modules/groups/composables/services/use-options-service'
import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { useLogger } from '@shared/utils/logger'

import type {
    IGroup,
    IOption,
    IProduct,
    IVariant
} from '@proshop/types'

import {
    OPTION_CREATE_ERROR,
    OPTION_CREATE_SUCCESS,
    OPTION_DELETE_ERROR,
    OPTION_DELETE_SUCCESS,
    SEARCH_ERROR
} from '@modules/groups/constants/notifications'
import { SEARCH_INPUT_MIN_LENGTH } from '@modules/groups/constants/options'

export const useOptions = () => {
    const {
        options,
        createOption,
        getOptions,
        deleteOption,
        clearOptions
    } = useOptionsService()

    const { filterItems, getFilterItems } = useFilterItemsService()
    const { filterGroups, getFilterGroups } = useFilterGroupService()
    const { products, getProducts, updateProduct } = useProductsService()
    const { hasOptions, model: groupModel } = useGroupModel()
    const { updateGroup } = useGroupsService()
    const { logError } = useLogger()
    const { notify } = useNotifications()

    const optionProduct = ref<Maybe<IProduct>>(null)

    const productGroups = computed<IGroup[]>(() => unref(optionProduct)?.groups as IGroup[] ?? [])

    const productGroupsMap = computed<Record<string, boolean>>(() => unref(productGroups).reduce((map, { variant }) => {
        map[(variant as IVariant)!.id] = true

        return map
    }, {}) ?? {})

    const addProductGroup = () => {
        unref(optionProduct)!.groups ??= []
        const varIds = unref(productGroups).map((it: IGroup) => it.id)

        varIds.push(unref(groupModel).id)

        return updateProduct({
            id: unref(optionProduct)!.id,
            groups: varIds
        })
    }

    const deleteProductGroup = ({ groupId, productId }: IOption) => {
        const groupIds = unref(productGroups).filter(({ id }) => id !== groupId)

        return updateProduct({
            id: productId,
            groups: groupIds
        })

    }

    const saveOption = async (option: IOption) => {
        try {
            await createOption(option)

            if (!unref(productGroupsMap)[unref(groupModel).id]) {
                await addProductGroup()
            }

            if (!unref(hasOptions)) {
                await updateGroup({
                    hasOptions: true,
                    id: unref(groupModel).id
                })
            }

            notify(OPTION_CREATE_SUCCESS)
        } catch (err) {
            notify(OPTION_CREATE_ERROR)
        }
    }

    const onDeleteOption = async (option: IOption) => {
        try {
            await deleteOption(option.id)
            await deleteProductGroup(option)

            notify(OPTION_DELETE_SUCCESS)
        } catch (err) {
            notify(OPTION_DELETE_ERROR)
        }
    }

    const onSearchProducts = async (value: string): Promise<IProduct[] | void> => {
        try {
            if (value.length < SEARCH_INPUT_MIN_LENGTH) {
                return
            }

            return await getProducts({ name: value })
        } catch (err) {
            logError('Search results loading failed', err)

            notify(SEARCH_ERROR)
        }
    }

    return {
        products,
        filterItems,
        filterGroups,
        options,
        optionProduct,
        getFilterGroups,
        getFilterItems,
        getOptions,
        saveOption,
        onDeleteOption,
        onSearchProducts,
        clearOptions
    }
}
