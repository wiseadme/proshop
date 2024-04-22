import { useGroupRepository } from '@modules/groups/repository/group.repository.ts'
import { IGroup } from '@proshop/types'

const groupRepository = useGroupRepository()

export const actions = {
    async createGroup(group: IGroup) {
        try {
            const data = await groupRepository.create(group)

            this.$patch(state => {
                state.group = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
