import { useUsersRepository } from '@modules/users/repository/users.repository'

import type { IUser } from '@proshop-app/types'

const repository = useUsersRepository()

export const actions = {
    async createUser(user: IUser) {
        try {
            const { data } = await repository.create(user)

            this.$patch(state => {
                state.users.push(data.data)
            })

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

    async deleteUser(id: string) {
        try {
            await repository.delete(id)

            this.$patch(state => {
                state.users = state.users.filter((user) => user.id !== id)
            })

            return true
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
