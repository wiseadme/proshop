import { IAuthRepository, useAuthRepository } from '@shared/repository/auth.repository'

const repository: IAuthRepository = useAuthRepository()

export const actions = {
  async loginUser(user){
    try {
      const { data } = await repository.login(user)

      for (const key of Object.keys(data.data)) {
        this[key] = data.data[key]
      }

      return data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
