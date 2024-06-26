import { IVariant } from '@proshop/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository<IVariant> {
    client: IRest<IVariant>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(variant: IVariant){
        return this.client.post(this.path, variant)
    }

    read(params: Partial<IVariant>){
        return this.client.get(this.path, { query: params })
    }

    update(updates: Partial<IVariant>){
        return this.client.patch(this.path, updates)
    }

    delete(id){
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useVariantRepository = () => new Repository({
    client: rest,
    path: '/api/v1/variant'
})
