import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IOption } from '@proshop/types'

class Repository implements IRepository<IOption> {
    client: IRest<IOption>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(option: IOption) {
        return this.client.post(this.path, option)
    }

    delete(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }

    update(updates: Partial<IOption>) {
        return this.client.patch(this.path, updates)
    }

    read(id?: string) {
        return this.client.get(this.path, { params: { id } })
    }
}

export const useOptionsRepository = () => new Repository({
    client: rest.client,
    path: '/api/v1/options',
})
