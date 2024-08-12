import { useSharedHttp } from '@shared/composables/use-http'

import type { IGroup, IGroupParams } from '@proshop-app/types'


export const useGroupsRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createGroup = (group: IGroupParams) => request<IGroup>({
        url: '/api/v1/groups',
        method: 'POST',
        body: group
    })

    const getGroups = (params: Partial<IGroup>) => request<IGroup[]>({
        url: '/api/v1/groups',
        params
    })

    const updateGroup = (updates: Partial<IGroup>) => request({
        url: '/api/v1/groups',
        method: 'PATCH',
        body: updates
    })

    const deleteGroup = (id: string) => request({
        url: '/api/v1/groups',
        method: 'DELETE',
        params: { id }
    })

    return {
        createGroup,
        getGroups,
        updateGroup,
        deleteGroup,
        cancel
    }
}
