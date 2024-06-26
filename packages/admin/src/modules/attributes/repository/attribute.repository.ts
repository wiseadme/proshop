import { IAttribute } from '@proshop/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository<IAttribute> {
    client: IRest<IAttribute>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(attribute){
        return this.client.post(this.path, attribute)
    }

    read(id = ''){
        return this.client.get(this.path, { query: { id } })
    }

    update(updates){
        return this.client.patch(this.path, updates)
    }

    delete(id){
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useAttributeRepository = () => new Repository({
    client:  rest,
    path: '/api/v1/attribute'
})
