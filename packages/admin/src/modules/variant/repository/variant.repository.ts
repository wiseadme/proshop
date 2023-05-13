import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IVariant } from '@ecommerce-platform/types'

export class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/variant'

  create(variant: IVariant): Promise<{ data: { data: IVariant } }>{
      return this.rest.post(this.baseUrl, variant)
  }

  read(params: Partial<IVariant>){
      return this.rest.get(this.baseUrl, { query: params })
  }

  update(updates: Partial<IVariant>): Promise<{ data: { data: Array<IVariant> } }>{
      return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
      return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useVariantRepository = () => new Repository()
