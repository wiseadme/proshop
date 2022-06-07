import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

export class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/units'

  create(unit: IUnit): Promise<{ data: { data: IUnit } }>{
    return this.rest.post(this.baseUrl, unit)
  }

  read(id = ''){
    return this.rest.get(this.baseUrl, { query: { id } })
  }

  update(updates): Promise<{ data: { data: Array<IUnit> } }>{
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useUnitRepository = () => new Repository()
