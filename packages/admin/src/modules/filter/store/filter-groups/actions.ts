import { useFilterGroupsRepository } from '@modules/filter/repository/filter-groups.repository'
import { IFilterGroup } from '@proshop/types'

const repository = useFilterGroupsRepository()
export const actions = {
    async createFilterGroup(filter: IFilterGroup) {
        try {
            const { data } = await repository.create(filter)

            this.$patch(state => {
                state.filterGroups.push(data.data)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getFilterGroups(params) {
        try {
            const { data } = await repository.read(params)

            this.$patch(state => {
                state.filterGroups = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteFilterGroup(id: string) {
        try {
            const { data } = await repository.delete(id)

            this.$patch(state => {
                state.filterGroups = state.filterGroups.filter(group => group.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
