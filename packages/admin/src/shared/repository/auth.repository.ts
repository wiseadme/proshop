import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'

interface AuthRepository {
  login(user: any): Promise<any>
}

class Repository implements AuthRepository {
  baseUrl: string
  rest: IRest

  constructor(rest, baseUrl){
    this.rest = rest
    this.baseUrl = baseUrl
  }

  async login(user){
    return this.rest.post('/login', user)
  }
}

export const useAuthRepository = () => new Repository(rest, '/v1/auth')
