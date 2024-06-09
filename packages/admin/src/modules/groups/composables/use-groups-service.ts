import {useGroupsStore} from '@modules/groups/store'
import {IGroup} from '@proshop/types'

export const useGroupsService = () => {
    const {createGroup: createNewGroup} = useGroupsStore()

    const createGroup = async (group: IGroup) => {
        try {
            return await createNewGroup(group)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        createGroup,
    }
}
