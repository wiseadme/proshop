import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'
import { AUTH_URL } from '@shared/constants/api'

export interface IAuthRepository {
  login(user: any): Promise<any>
}

class Repository implements IAuthRepository {
  baseUrl: string
  rest: IRest

  constructor(rest, baseUrl){
    this.rest = rest
    this.baseUrl = baseUrl
  }

  async login(user){
    return this.rest.post(`${ this.baseUrl }/login`, user)
  }
}

export const useAuthRepository = () => new Repository(rest, AUTH_URL)
