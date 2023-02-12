import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/order'

  create(order){
    return rest.post(this.baseUrl, order)
  }

  read(params){
    return rest.get(this.baseUrl, params ? { params } : null)
  }

  update(updates){
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useOrderRepository = () => new Repository()
