import { IFilterGroup } from '@proshop/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository<IFilterGroup> {
    public path: string
    public client: IRest<IFilterGroup>

    constructor({ client, path }) {
        this.path = path
        this.client = client
    }

    async create(filterGroup: IFilterGroup) {
        return this.client.post(this.path, filterGroup)
    }

    async read(params = {}) {
        return this.client.get(this.path, { params })
    }

    async update(updates) {
        return this.client.patch(this.path, updates)
    }

    async delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useFilterGroupsRepository = () => new Repository({
    path: '/api/v1/filter/groups',
    client: rest
})
