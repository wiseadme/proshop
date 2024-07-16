import { useSharedHttp } from '@shared/composables/use-http'

import { IFilterGroup, IGroup } from '@proshop-app/types'

export const useFilterGroupsRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createFilterGroup = (group: IFilterGroup) => request({
        url: '/api/v1/filter/groups',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: group
    })

    const getFilterGroups = (params?: Partial<IFilterGroup>) => request({
        url: '/api/v1/filter/groups',
        credentials: 'same-origin',
        cache: 'no-cache',
        params
    })

    const updateFilterGroup = (updates: Partial<IGroup>) => request({
        url: '/api/v1/filter/groups',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates
    })

    const deleteFilterGroup = (id: string) => request({
        url: '/api/v1/filter/groups',
        method: 'DELETE',
        credentials: 'same-origin',
        cache: 'no-cache',
        params: { id }
    })

    return {
        createFilterGroup,
        getFilterGroups,
        updateFilterGroup,
        deleteFilterGroup,
        cancel
    }
}
