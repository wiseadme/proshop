import {
    useFilterGroupsRepository
} from '@modules/filters/composables/repository/use-filter-groups-repository'

import type { IFilterGroup } from '@proshop-app/types'

const repository = useFilterGroupsRepository()

export const actions = {
    async createFilterGroup(filter: IFilterGroup) {
        try {
            const { data } = await repository.createFilterGroup(filter)

            this.$patch(state => {
                state.filterGroups.push(data)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getFilterGroups(params = {}) {
        try {
            const { data } = await repository.getFilterGroups(params)

            this.$patch(state => {
                state.filterGroups = data
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteFilterGroup(id: string) {
        try {
            const { data } = await repository.deleteFilterGroup(id)

            this.$patch(state => {
                state.filterGroups = state.filterGroups.filter(group => group.id !== id)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateFilterGroup(updates) {
        try {
            const { data } = await repository.updateFilterGroup(updates)

            this.$patch(state => {
                state.filterGroups = state.filterGroups.map((group) => {
                    if (data.data.id === group.id) return data

                    return group
                })
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
