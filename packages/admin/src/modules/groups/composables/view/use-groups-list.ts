import { useGroupsService } from '@modules/groups/composables/services/use-groups-service.ts'
import { useNotifications } from '@shared/components/VNotifications/use-notifications.ts'
import { useGroupModel } from '@modules/groups/composables/view/use-group-model.ts'
import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal.ts'
import { GROUP_DELETE_ERROR } from '@modules/groups/constants/notifications.ts'
import { Group } from '@modules/groups/model/group.model.ts'
import { IGroup } from '@proshop/types'

export const useGroupsList = () => {
    const {
        readOnlyGroups: groups,
        getGroups,
        deleteGroup,
    } = useGroupsService()

    const {showFormModal} = useGroupsFormModal()

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
        showFormModal.value = true
    }

    return {
        groups,
        getGroups,
        onDeleteGroup,
        onEditGroup
    }
}
