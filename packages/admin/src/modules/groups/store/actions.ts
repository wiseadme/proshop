import { useGroupRepository } from '@modules/groups/repository/group.repository'
import { IGroup } from '@proshop/types'

const groupRepository = useGroupRepository()

export const actions = {
    async createGroup(group: IGroup) {
        try {
            const { data } = await groupRepository.createGroup(group)

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
            const { data } = await groupRepository.getGroups(params)

            this.$patch({ groups: data.data })

            return this.groups
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
