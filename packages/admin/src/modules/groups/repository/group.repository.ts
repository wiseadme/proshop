import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IGroup } from '@proshop/types'

export class Repository implements IRepository<IGroup> {
    client: IRest<IGroup>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(group: IGroup) {
        return this.client.post(this.path, group)
    }

    read(params: Partial<IGroup>) {
        return this.client.get(this.path, { query: params })
    }

    update(updates){
        return this.client.patch(this.path, updates)
    }

    delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useGroupRepository = () => new Repository({
    client: rest,
    path: '/api/v1/group'
})
