import { IFilterItem } from '@proshop/types'
import { useFilterItemsRepository } from '@modules/filter/repository/filter-items.repository'

const repository = useFilterItemsRepository()
export const actions = {
    async createFilter(filterItem: IFilterItem) {
        try {
            const { data } = await repository.create(filterItem)

            this.$patch(state => {
                state.filterItems.push(data.data)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getFilters(params = {}) {
        try {
            const { data } = await repository.read(params)

            this.$patch({ filterItems: data.data })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteFilter(id: string) {
        try {
            const { data } = await repository.delete(id)

            this.$patch(state => {
                state.filterItems = state.filterItems.filter(filter => filter.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}