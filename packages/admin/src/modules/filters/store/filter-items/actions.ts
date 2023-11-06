import { IFilterItem } from '@proshop/types'
import { useFilterItemsRepository } from '@modules/filters/repository/filter-items.repository'

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

    async updateFilter(params: Partial<IFilterItem> = {}) {
        try {
            const { data } = await repository.update(params)

            this.$patch(state => {
                state.filterItems = state.filterItems.map(it => it.id === params.id ? data.data : it)
            })

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
