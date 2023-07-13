import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository {
    client: IRest
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(customer) {
        return this.client.post(this.path, customer)
    }

    read(params) {
        return this.client.get(this.path, { params })
    }

    update(updates) {
        return this.client.patch(this.path, updates)
    }

    delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useCustomersRepository = () => new Repository({
    client: rest,
    path: '/api/v1/customer'
})
