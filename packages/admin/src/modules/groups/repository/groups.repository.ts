import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'
import { IGroup } from '@proshop/types'
import { AxiosResponse } from 'axios'

interface IGroupsRepository {
    createGroup(group: IGroup): Promise<AxiosResponse<{ data: IGroup, ok: boolean }>>
    getGroups(params: Partial<IGroup>): Promise<AxiosResponse<{ data: IGroup[], ok: boolean }>>
    updateGroup(updates: Partial<IGroup>): Promise<AxiosResponse<{ data: IGroup, ok: boolean }>>
    deleteGroup(id: string): Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

export class Repository implements IGroupsRepository {
    client: IRest<IGroup>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    createGroup(group: IGroup): Promise<AxiosResponse<{ data: IGroup, ok: boolean }>> {
        return this.client.post(this.path, group)
    }

    getGroups(params: Partial<IGroup>) {
        return this.client.get(this.path, { query: params })
    }

    updateGroup(updates: Partial<IGroup>){
        return this.client.patch(this.path, updates)
    }

    deleteGroup(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useGroupsRepository = () => new Repository({
    client: rest,
    path: '/api/v1/groups'
})
