import { IMetaTag } from '@proshop/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository<IMetaTag> {
    client: IRest<IMetaTag>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }
    create(metaTag) {
        return this.client.post(this.path, metaTag)
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

export const useMetaTagRepository = () => new Repository({
    client: rest,
    path: '/api/v1/metatag'
})
