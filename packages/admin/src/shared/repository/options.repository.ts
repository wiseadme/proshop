import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'
import { IOption } from '@ecommerce-platform/server/src/modules/option/types/model'

interface IOptionsRepository extends IRepository {
  create: (option: IOption) => Promise<{ data: { data: IOption } }>
  read: (id?: string) => Promise<{ data: { data: IOption[] } }>
}

class Repository implements Partial<IOptionsRepository> {
  private _rest: IRest
  private _baseUrl: string

  constructor(rest, baseUrl){
    this._rest = rest
    this._baseUrl = baseUrl
  }

  create(option){
    return this._rest.post(this._baseUrl, option)
  }

  delete(id){
    return this._rest.delete(this._baseUrl, { params: { id } })
  }

  read(id?: string){
    return this._rest.get(this._baseUrl, { params: { id } })
  }
}

export const useOptionsRepository = () => new Repository(rest, '/v1/options')
