import { unref } from 'vue'
import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { useGroupsService } from '@modules/groups/composables/services/use-groups-service'
import { useLogger } from '@shared/utils/logger'
import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { Group } from '@modules/groups/model/group.model'
import { GROUP_CREATE_ERROR } from '@modules/groups/constants/notifications'
import type { IGroup, IVariant } from '@proshop/types'

export const useGroups = () => {
    const { readOnlyGroups, createGroup, updateGroup } = useGroupsService()
    const { variants, getVariants } = useVariantsService()
    const { model } = useGroupModel()
    const { logError } = useLogger()
    const { notify } = useNotifications()

    const getVariantItems = async (): Promise<IVariant[] | void> => {
        try {
            return await getVariants()
        } catch (err) {
            logError('Groups variants loading failed', err)
        }
    }

    const onCreateGroup = async () => {
        try {
            model.value = Group.create(await createGroup(unref(model)))
        } catch (err) {
            notify(GROUP_CREATE_ERROR)
        }
    }

    const onUpdateGroup = async (updates: Partial<IGroup>) => {
        try {
            await updateGroup({
                ...updates,
                id: unref(model).id
            })
        } catch (err) {
            notify(GROUP_CREATE_ERROR)
        }
    }

    return {
        variants,
        groups: readOnlyGroups,
        onCreateGroup,
        onUpdateGroup,
        getVariantItems,
    }
}
