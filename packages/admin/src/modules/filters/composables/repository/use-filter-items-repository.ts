import { useSharedHttp } from '@shared/composables/use-http'

import { IFilterItem, IGroup } from '@proshop-app/types'

export const useFilterItemsRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createFilterItem = (filterItem: IFilterItem) => request({
        url: '/api/v1/filter/items',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: filterItem
    })

    const getFilterItems = (params?: Partial<IFilterItem>) => request({
        url: '/api/v1/filter/items',
        params
    })

    const updateFilterItem = (updates: Partial<IGroup>) => request({
        url: '/api/v1/filter/items',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates
    })

    const deleteFilterItem = (id: string) => request({
        url: '/api/v1/filter/items',
        method: 'DELETE',
        params: { id }
    })

    return {
        createFilterItem,
        getFilterItems,
        updateFilterItem,
        deleteFilterItem,
        cancel
    }
}
