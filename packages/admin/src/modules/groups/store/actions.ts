import { useGroupRepository } from '@modules/groups/repository/group.repository'
import { IGroup } from '@proshop/types'

const repository = useGroupRepository()

export const actions = {
    async createGroup(group: IGroup) {
        try {
            const { data } = await repository.createGroup(group)

            this.$patch((state) => {
                state.groups.push(data.data)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getGroups(params = {}) {
        try {
            const { data } = await repository.getGroups(params)

            this.$patch({ groups: data.data })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateGroup(updates: Partial<IGroup>) {
        try {
            const { data } = await repository.updateGroup(updates)

            this.$patch((state) => {
                state.groups = state.groups.reduce((acc, group) => {
                    const isUpdated = data.data.id === group.id
                    acc.push(isUpdated ? data.data : group)

                    return acc
                }, [])
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteGroup(id: string) {
        try {
            const { data } = await repository.deleteGroup(id)

            this.$patch((state) => {
                state.groups = state.groups.filter(it => it.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
