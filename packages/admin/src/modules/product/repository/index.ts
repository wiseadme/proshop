import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IProduct } from '@proshop/types'

class Repository implements IRepository<IProduct> {
  rest: IRest<IProduct>
  baseUrl: string

  constructor(rest, baseUrl){
      this.rest = rest
      this.baseUrl = baseUrl
  }

  create(product){
      return rest.post(this.baseUrl, product)
  }

  read(params){
      return rest.get(this.baseUrl, params ? { params } : {})
  }

  update(updates){
      return this.rest.patch(this.baseUrl, updates)
  }

  delete(id){
      return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useProductRepository = () => new Repository(rest, '/api/v1/product')
