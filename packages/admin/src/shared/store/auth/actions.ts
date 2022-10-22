import { IAuthRepository, useAuthRepository } from '@shared/repository/auth.repository'

const repository: IAuthRepository = useAuthRepository()

export const actions = {
  async loginUser(user){
    try {
      const { data } = await repository.login(user)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
