import { ref } from 'vue'

import { useGroupsService } from '@modules/groups/composables/services/use-groups-service'
import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal'
import { useOptionModel } from '@modules/groups/composables/view/use-option-model'
import { useOptionsFormModal } from '@modules/groups/composables/view/use-options-form-modal'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IGroup, IVariant } from '@proshop-app/types'

import { GROUP_DELETE_ERROR, GROUP_DELETE_WARNING } from '@modules/groups/constants/notifications'

export const useGroupsTable = () => {
    const { notify } = useNotifications()

    const {
        groups: rows,
        getGroups,
        deleteGroup,
    } = useGroupsService()

    const { setModel: setGroupModel } = useGroupModel()
    const {setModel: setOptionModel} = useOptionModel()
    const { isGroupModalVisible } = useGroupsFormModal()
    const { isOptionsModalVisible } = useOptionsFormModal()

    const cols = ref([
        {
            key: 'actions',
            title: 'Действия',
            align: 'center',
            width: '300',
        },
        {
            key: 'title',
            title: 'Название группы',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IGroup) => row.name,
        },
        {
            key: 'variant',
            title: 'Название варианта',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IGroup) => (row.variant as IVariant)!.name,
        },
    ])

    const onDeleteGroup = (group: IGroup) => {
        if (group.hasOptions) {
            notify(GROUP_DELETE_WARNING)
        } else {
            deleteGroup(group.id).catch(() => notify(GROUP_DELETE_ERROR))
        }
    }

    const onOpenGroupModal = (group?: IGroup) => {
        setGroupModel(group)
        setOptionModel()
        isGroupModalVisible.value = true
    }

    const onOpenOptionsModal = (group: IGroup) => {
        setGroupModel(group)
        setOptionModel()
        isOptionsModalVisible.value = true
    }

    return {
        cols,
        rows,
        getGroups,
        onOpenGroupModal,
        onOpenOptionsModal,
        onDeleteGroup
    }
}
