import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/settings'

  async create() {
      return { data: null }
  }

  async read() {
      return rest.get(this.baseUrl)
  }

  async update() {
      return { data: null }
  }

  async delete(id: string) {
      return this.rest.delete(this.baseUrl, { params: { id } })
  }
}

export const useSettingsRepository = () => new Repository()
