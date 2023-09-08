import { IAuthRepository, useAuthRepository } from '@shared/repository/auth.repository'

const repository: IAuthRepository = useAuthRepository()

console.log(repository)

export const actions = {
    async loginUser(user: {username: string, password: string}){
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

    async logoutUser(){
        try {
            if (this.user) await repository.logout()

            this.$patch(state => {
                state.isAuthenticated = false
                state.user = null
                state.isChecked = true
            })

            return true
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

    async refresh(){
        try {
            const { data } = await repository.refresh()

            this.$patch(state => {
                state.user = data.data
                state.isAuthenticated = true
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
