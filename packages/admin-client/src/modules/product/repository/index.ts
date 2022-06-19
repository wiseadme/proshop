import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/products'

  create(product){
    return rest.post(this.baseUrl, product)
  }

  read(id = ''){
    return rest.get(this.baseUrl, { query: { id } })
  }

  update(updates){
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useProductRepository = () => new Repository()
