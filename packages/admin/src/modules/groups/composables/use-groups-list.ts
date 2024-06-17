import { useGroupsService } from '@modules/groups/composables/use-groups-service'
import { IGroup } from '@proshop/types'

export const useGroupsList = () => {
    const {
        readOnlyGroups: groups,
        getGroups,
        deleteGroup,
        updateGroup
    } = useGroupsService()

    const onDeleteGroup = (group: IGroup) => {
        return deleteGroup(group.id)
    }

    const onEditGroup = (updates) => {
        return updateGroup(updates)
    }

    return {
        groups,
        getGroups,
        onDeleteGroup,
        onEditGroup
    }
}
