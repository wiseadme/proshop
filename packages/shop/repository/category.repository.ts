import { api } from '~/api/axios'
import { Rest } from '~/plugins/Rest'

export class Repository {
  rest: Rest;

  constructor(rest: Rest) {
    this.rest = rest
  }

  getCategories(): Promise<any> {
    return this.rest.read()
  }
}

export const useCategoryRepository = () => new Repository(new Rest(api, '/v1/categories'))
