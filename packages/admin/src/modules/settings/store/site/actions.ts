import { useSiteRepository } from '@modules/settings/repository/site.repository'
import { ISite } from '@proshop/types'

const repository = useSiteRepository()

interface Actions {
    createSiteConfig(config: ISite): Promise<ISite>

    getSiteConfig(): Promise<ISite>

    updateSiteConfig(updates: Partial<ISite>): Promise<ISite>
}

export const actions: Actions = {
    async createSiteConfig(config) {
        try {
            const { data } = await repository.create(config)

            this.$patch(state => {
                state.site = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getSiteConfig() {
        try {
            const { data } = await repository.read()

            this.$patch(state => {
                state.site = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateSiteConfig(updates: Partial<ISite>) {
        try {
            const { data } = await repository.update(updates)

            this.$patch(state => {
                state.site = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
