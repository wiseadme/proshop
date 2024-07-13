import { IUnit } from '@proshop/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository<IUnit> {
    client: IRest<IUnit>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(unit: IUnit) {
        return this.client.post(this.path, unit)
    }

    read(params: Partial<IUnit>) {
        return this.client.get(this.path, { query: params })
    }

    update(updates){
        return this.client.patch(this.path, updates)
    }

    delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useUnitRepository = () => new Repository({
    client: rest,
    path: '/api/v1/unit'
})
