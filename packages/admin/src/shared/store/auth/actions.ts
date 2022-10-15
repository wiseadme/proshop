import { useAuthRepository } from '@shared/repository/auth.repository'

const repository = useAuthRepository()

export const actions = {
  async loginUser(user){
    try {
      const { data } = await repository.login(user)
      console.log(data)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
