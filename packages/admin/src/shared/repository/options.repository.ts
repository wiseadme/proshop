import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IVariantOption } from '@modules/variant/types'

interface IOptionsRepository extends IRepository {
  create: (option: IVariantOption) => Promise<{ data: { data: IVariantOption } }>
  read: (id?: string) => Promise<{ data: { data: IVariantOption[] } }>
  update: (updates: Partial<IVariantOption>) => Promise<{ data: { data: IVariantOption } }>
  delete: (id: string) => Promise<{ data: { data: boolean } }>
}

class Repository implements IOptionsRepository {
  private _rest: IRest
  private _baseUrl: string

  constructor(rest, baseUrl){
    this._rest = rest
    this._baseUrl = baseUrl
  }

  create(option: IVariantOption){
    return this._rest.post(this._baseUrl, option)
  }

  delete(id: string){
    return this._rest.delete(this._baseUrl, { params: { id } })
  }

  update(updates: Partial<IVariantOption>){
    return this._rest.patch(this._baseUrl, updates)
  }

  read(id?: string){
    return this._rest.get(this._baseUrl, { params: { id } })
  }
}

export const useOptionsRepository = () => new Repository(rest, '/v1/options')
