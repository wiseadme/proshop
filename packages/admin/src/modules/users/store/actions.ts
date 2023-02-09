import { useUsersRepository } from '@modules/users/repository/users.repository'
import { IUser } from '@ecommerce-platform/types'

const repository = useUsersRepository()

export const actions = {
  async createUser(user: IUser) {
    try {
      const { data } = await repository.create(user)

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async fetchUsers(params: Partial<IUser> = {}): Promise<IUser[]> {
    try {
      const { data } = await repository.read(params)

      this.$patch(state => {
        state.users = data.data
      })

      return data.data

    } catch (err) {
      return Promise.reject(err)
    }
  },
}
