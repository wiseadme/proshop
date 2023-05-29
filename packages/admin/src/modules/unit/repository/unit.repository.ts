import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IUnit } from '@proshop/types'

export class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/unit'

  create(unit: IUnit): Promise<{ data: { data: IUnit } }> {
      return this.rest.post(this.baseUrl, unit)
  }

  read(params: Partial<IUnit>) {
      return this.rest.get(this.baseUrl, { query: params })
  }

  update(updates): Promise<{ data: { data: IUnit } }> {
      return this.rest.patch(this.baseUrl, updates)
  }

  delete(id) {
      return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const
    useUnitRepository = () => new Repository()
