import { useGroupsService } from '@modules/groups/composables/use-groups-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { GROUP_DELETE_ERROR } from '@modules/groups/constants/notifications'
import { IGroup } from '@proshop/types'

export const useGroupsList = () => {
    const {
        readOnlyGroups: groups,
        getGroups,
        deleteGroup,
        updateGroup
    } = useGroupsService()

    const { notify } = useNotifications()

    const onDeleteGroup = async (group: IGroup) => {
        try {
            await deleteGroup(group.id)
        } catch (err) {
            notify(GROUP_DELETE_ERROR)
        }
    }

    const onEditGroup = (updates: Partial<IGroup>) => {
        return updateGroup(updates)
    }

    return {
        groups,
        getGroups,
        onDeleteGroup,
        onEditGroup
    }
}
