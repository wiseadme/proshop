import { IAttribute } from '@proshop-app/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository<IAttribute> {
    client: IRest<IAttribute>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(attribute: IAttribute) {
        return this.client.post(this.path, attribute)
    }

    read(id = '') {
        return this.client.get(this.path, { query: { id } })
    }

    update(updates: IAttribute[]) {
        return this.client.patch(this.path, updates)
    }

    delete(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useAttributeRepository = () => new Repository({
    client: rest,
    path: '/api/v1/attribute'
})
