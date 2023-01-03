import { auth } from '@shared/api'
import { IRest } from '@shared/types/app'

export interface IAuthRepository {
  login(user: any): Promise<any>

  logout(): Promise<any>

  create(user: any): Promise<any>

  whoAmI(): Promise<any>

  refresh(): Promise<any>
}

class Repository implements IAuthRepository {
  rest: IRest

  constructor(rest){
    this.rest = rest
  }

  async login(user){
    return this.rest.post('/v1/auth/login', user)
  }

  async logout(){
    return this.rest.get('/v1/auth/logout')
  }

  async create(user){
    return this.rest.post('/v1/auth/create', user)
  }

  async refresh(){
    return this.rest.get('/v1/auth/refresh')
  }

  async whoAmI(){
    return this.rest.get('/v1/auth/check')
  }
}

export const useAuthRepository = () => new Repository(auth)
