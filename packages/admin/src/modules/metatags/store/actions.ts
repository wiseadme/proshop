import { useMetaTagRepository } from '@modules/metatags/repository/metatag.repository'

const repository = useMetaTagRepository()

export const actions = {
    async create(metaTag) {
        try {
            const { data } = await repository.create(metaTag)

            this.$patch(state => {
                state.metaTags = [ ...state.metaTags, data.data ]
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params = {}) {
        try {
            const { data } = await repository.read(params)

            this.$patch(state => state.metaTags = data.data)

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },


    async update(updates) {
        try {
            const { data } = await repository.update(updates)

            this.$patch(state => {
                state.metaTags = state.metaTags.reduce((acc, it) => {
                    const isUpdatedItem = it.id === data.data.id

                    isUpdatedItem ? acc.push(data.data) : acc.push(it)

                    return acc
                }, [])
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id) {
        try {
            await repository.delete(id)

            this.$patch(state => {
                state.metaTags = state.metaTags.filter((it) => it.id !== id)
            })

            return true
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
