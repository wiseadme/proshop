import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IMerchant } from '@ecommerce-platform/types'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/settings/merchant'

  create(merchant: IMerchant){
    return rest.post(this.baseUrl, merchant)
  }

  read(){
    return rest.get(this.baseUrl)
  }

  update(updates: Partial<IMerchant>){
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id: string){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useMerchantRepository = () => new Repository()
