import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { ICategory } from '@proshop/types'

class Repository implements IRepository<ICategory> {
    client: IRest<ICategory>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }
    create(category: ICategory) {
        return this.client.post(this.path, category)
    }

    read(params) {
        return this.client.get(this.path, { params })
    }

    update(updates: Partial<ICategory>) {
        return this.client.patch(this.path, updates)
    }

    delete(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useCategoryRepository = () => new Repository({
    client: rest,
    path: '/api/v1/category'
})
