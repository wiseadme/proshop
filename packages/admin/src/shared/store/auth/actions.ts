import { IAuthRepository, useAuthRepository } from '@shared/repository/auth.repository'

const repository: IAuthRepository = useAuthRepository()

interface IUser {
  firstName: string
  lastName: string
  username: string
  email: string
  phone: number
}

export const actions = {
  async loginUser(user){
    try {
      const { data } = await repository.login(user)

      this.$patch(state => {
        state.user = data.data
        state.isAuthenticated = true
      })

      return data.data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async createUser(user: IUser){
    try {
      const { data } = await repository.create(user)

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async whoAmI(){
    try {
      const { data } = await repository.whoAmI()

      this.$patch(state => {
        state.user = data?.data
        state.isAuthenticated = true
        state.isChecked = true
      })

      return data.data
    } catch (err) {
      this.isChecked = true

      return Promise.reject(err)
    }
  },

  async logout(){
    try {
      if (this.user) {
        await repository.logout()
      }

      this.$patch(state => {
        state.user = null
        state.isAuthenticated = false
      })

      return true
    } catch (err) {
      return Promise.reject(err)
    }
  }
}