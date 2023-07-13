import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IAttribute } from '@proshop/types'

export class Repository implements IRepository {
    client: IRest = rest
    path: string = '/api/v1/attribute'

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

    update(updates): Promise<{ data: { data: Array<IAttribute> } }>{
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
