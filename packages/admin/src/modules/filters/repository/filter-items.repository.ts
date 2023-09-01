import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IFilterItem } from '@proshop/types'

export class Repository implements IRepository<IFilterItem> {
    public path: string
    public client: IRest<IFilterItem>

    constructor({ client, path }) {
        this.path = path
        this.client = client
    }

    async create(filterItem: IFilterItem) {
        return this.client.post(this.path, filterItem)
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

export const useFilterItemsRepository = () => new Repository({
    path: '/api/v1/filter/items',
    client: rest
})
