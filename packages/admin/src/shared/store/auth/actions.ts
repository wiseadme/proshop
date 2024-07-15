import { useAuthRepository } from '@shared/composables/repository/use-auth-repository'

const repository = useAuthRepository()

export const actions = {
    async loginUser(user: { username: string, password: string }) {
        try {
            const { data } = await repository.login(user)

            this.$patch(state => {
                state.user = data
                state.isAuthenticated = true
            })

            return data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async logoutUser() {
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

    async whoAmI() {
        try {
            const { data } = await repository.whoAmI()

            this.$patch(state => {
                state.user = data
                state.isAuthenticated = true
                state.isChecked = true
            })

            return data
        } catch (err) {
            this.isChecked = true

            return Promise.reject(err)
        }
    },

    async refresh() {
        try {
            const { data } = await repository.refreshToken()

            this.$patch(state => {
                state.user = data
                state.isAuthenticated = true
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
