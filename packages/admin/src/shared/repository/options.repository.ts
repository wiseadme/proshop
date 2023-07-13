import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IOption } from '@proshop/types'

interface IOptionsRepository extends IRepository {
    create: (option: IOption) => Promise<{ data: { data: IOption } }>
    read: (id?: string) => Promise<{ data: { data: IOption[] } }>
    update: (updates: Partial<IOption>) => Promise<{ data: { data: IOption } }>
    delete: (id: string) => Promise<{ data: { data: boolean } }>
}

class Repository implements IOptionsRepository {
    client: IRest
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
    client: rest,
    path: '/api/v1/options',
})
