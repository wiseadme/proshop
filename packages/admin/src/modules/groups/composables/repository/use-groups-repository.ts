import { useSharedHttp } from '@shared/composables/use-http'

import type { IGroup } from '@proshop-app/types'

interface IGroupsRepository {
    createGroup(group: IGroup): Promise<{ data: IGroup, ok: boolean }>

    getGroups(params: Partial<IGroup>): Promise<{ data: IGroup[], ok: boolean }>

    updateGroup(updates: Partial<IGroup>): Promise<{ data: IGroup, ok: boolean }>

    deleteGroup(id: string): Promise<{ data: boolean, ok: boolean }>

    cancel(): void
}

export const useGroupsRepository = (): IGroupsRepository => {
    const { request, cancel } = useSharedHttp()

    const createGroup = (group: IGroup) => request({
        url: '/api/v1/groups',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: group
    })

    const getGroups = (params: Partial<IGroup>) => request({
        url: '/api/v1/groups',
        params
    })

    const updateGroup = (updates: Partial<IGroup>) => request({
        url: '/api/v1/groups',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
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