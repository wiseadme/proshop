import { rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/users'

  create(user) {
    return this.rest.post(this.baseUrl + '/create', user)
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

export const useUsersRepository = () => new Repository()
