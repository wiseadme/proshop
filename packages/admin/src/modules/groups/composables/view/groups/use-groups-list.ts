import { useGroupsService } from '@modules/groups/composables/services/use-groups-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { useGroupModel } from '@modules/groups/composables/view/groups/use-group-model'
import { useGroupsFormModal } from '@modules/groups/composables/view/groups/use-groups-form-modal'
import { GROUP_DELETE_ERROR } from '@modules/groups/constants/notifications'
import { Group } from '@modules/groups/model/group.model'
import type { IGroup } from '@proshop/types'

export const useGroupsList = () => {
    const {
        readOnlyGroups: groups,
        getGroups,
        deleteGroup,
    } = useGroupsService()

    const { isGroupModalVisible } = useGroupsFormModal()

    const { model } = useGroupModel()
    const { notify } = useNotifications()

    const onDeleteGroup = async (group: IGroup) => {
        try {
            await deleteGroup(group.id)
        } catch (err) {
            notify(GROUP_DELETE_ERROR)
        }
    }

    const onEditGroup = (group: IGroup) => {
        model.value = Group.create(group)
        isGroupModalVisible.value = true
    }

    return {
        groups,
        getGroups,
        onDeleteGroup,
        onEditGroup
    }
}
