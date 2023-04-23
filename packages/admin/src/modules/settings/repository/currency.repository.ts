import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository {
  rest: IRest = rest
  baseUrl: string = '/v1/currency'

  create(currency){
    return rest.post(this.baseUrl, currency)
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

export const useCurrenciesRepository = () => new Repository()
