import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'

export interface IAuthRepository {
  login(user: any): Promise<any>

  create(user: any): Promise<any>

  whoAmI(): Promise<any>
}

class Repository implements IAuthRepository {
  rest: IRest

  constructor(rest){
    this.rest = rest
  }

  async login(user){
    return this.rest.post(`/v1/auth/login`, user)
  }

  async create(user){
    return this.rest.post(`/v1/auth/create`, user)
  }

  async whoAmI(){
    return this.rest.get(`/v1/auth/check`)
  }
}

export const useAuthRepository = () => new Repository(rest)
