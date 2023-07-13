import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IUnit } from '@proshop/types'

export class Repository implements IRepository {
    client: IRest
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(unit: IUnit): Promise<{ data: { data: IUnit } }> {
        return this.client.post(this.path, unit)
    }

    read(params: Partial<IUnit>) {
        return this.client.get(this.path, { query: params })
    }

    update(updates): Promise<{ data: { data: IUnit } }> {
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
