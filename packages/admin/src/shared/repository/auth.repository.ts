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
    return this.rest.post('/v1/users/login', user)
  }

  async logout(){
    return this.rest.get('/v1/users/logout')
  }

  async create(user){
    return this.rest.post('/v1/users/create', user)
  }

  async refresh(){
    return this.rest.get('/v1/users/refresh')
  }

  async whoAmI(){
    return this.rest.get('/v1/users/whoami')
  }
}

export const useAuthRepository = () => new Repository(auth)
