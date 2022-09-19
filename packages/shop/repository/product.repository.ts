import { api } from '~/api/axios'
import { Rest } from '~/plugins/Rest'

export class Repository {
  rest: Rest;

  constructor(rest: Rest) {
    this.rest = rest
  }

  getCategoryProducts(categoryId: string): Promise<any> {
    return this.rest.read('', { params: { category: categoryId } })
  }
}

export const useProductRepository = () => new Repository(new Rest(api, '/v1/products'))
