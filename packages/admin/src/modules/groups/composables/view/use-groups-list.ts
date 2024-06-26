import { useGroupsService } from '@modules/groups/composables/services/use-groups-service'
import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'


import { Group } from '@modules/groups/model/group.model'

import type { IGroup } from '@proshop/types'

import { GROUP_DELETE_ERROR, GROUP_DELETE_WARNING } from '@modules/groups/constants/notifications'

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
        if (group.hasOptions) {
            return notify(GROUP_DELETE_WARNING)
        }

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
