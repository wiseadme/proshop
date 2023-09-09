import { rest } from '@shared/api'
import { IItemsRepository, IRest } from '@shared/types/app'
import {
    IProduct,
    IProductQuery,
    IRequestParams
} from '@proshop/types'

class Repository implements IItemsRepository<IProduct> {
  client: IRest<IProduct>
  path: string

  constructor({ client, path }){
      this.client = client
      this.path = path
  }

  create(product: IProduct){
      return this.client.post(this.path, product)
  }

  read(params: IRequestParams<IProductQuery>){
      return this.client.get(this.path, params ? { params } : {})
  }

  update(updates){
      return this.client.patch(this.path, updates)
  }

  delete(id){
      return this.client.delete(this.path, { params: { id } })
  }
}

export const useProductRepository = () => new Repository({
    client: rest.client,
    path: '/api/v1/product'
})
