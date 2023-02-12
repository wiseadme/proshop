import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/metatag'

  create(metaTag) {
    return this.rest.post(this.baseUrl, metaTag)
  }

  read(params) {
    return this.rest.get(this.baseUrl, { params })
  }

  update(updates) {
    return this.rest.patch(this.baseUrl, updates)
  }

  delete(id) {
    return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useMetaTagRepository = () => new Repository()
