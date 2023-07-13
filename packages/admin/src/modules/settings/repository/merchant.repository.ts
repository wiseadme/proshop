import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IMerchant } from '@proshop/types'

class Repository implements IRepository {
    client: IRest
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(merchant: IMerchant) {
        return this.client.post(this.path, merchant)
    }

    read() {
        return this.client.get(this.path)
    }

    update(updates: Partial<IMerchant>) {
        return this.client.patch(this.path, updates)
    }

    delete(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useMerchantRepository = () => new Repository({
    client: rest,
    path: '/api/v1/settings/merchant',
})
