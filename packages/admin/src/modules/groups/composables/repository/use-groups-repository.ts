import { AxiosResponse } from 'axios'

import type { IGroup } from '@proshop-app/types'

import { rest } from '@shared/api'

interface IGroupsRepository {
    createGroup(group: IGroup): Promise<AxiosResponse<{ data: IGroup, ok: boolean }>>

    getGroups(params: Partial<IGroup>): Promise<AxiosResponse<{ data: IGroup[], ok: boolean }>>

    updateGroup(updates: Partial<IGroup>): Promise<AxiosResponse<{ data: IGroup, ok: boolean }>>

    deleteGroup(id: string): Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

const path = '/api/v1/groups'

export const useGroupsRepository = (): IGroupsRepository => {

    const createGroup = (group: IGroup) => {
        return rest.post(path, group)
    }

    const getGroups = (params: Partial<IGroup>) => {
        return rest.get(path, { query: params })
    }

    const updateGroup = (updates: Partial<IGroup>) => {
        return rest.patch(path, updates)
    }

    const deleteGroup = (id: string) => {
        return rest.delete(path, { params: { id } })
    }

    return {
        createGroup,
        getGroups,
        updateGroup,
        deleteGroup
    }
}
