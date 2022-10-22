import { IAuthRepository, useAuthRepository } from '@shared/repository/auth.repository'

export class Actions {
  private repository: IAuthRepository

  constructor({ repository }){
    this.repository = repository
  }

  async loginUser(user){
    try {
      const { data } = await this.repository.login(user)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const actions = new Actions({
  repository: useAuthRepository()
})
