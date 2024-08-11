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
        body: group
    })

    const getFilterGroups = (params?: Partial<IFilterGroup>) => request({
        url: '/api/v1/filter/groups',
        params
    })

    const updateFilterGroup = (updates: Partial<IGroup>) => request({
        url: '/api/v1/filter/groups',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates
    })

    const deleteFilterGroup = (id: string) => request({
        url: '/api/v1/filter/groups',
        method: 'DELETE',
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
