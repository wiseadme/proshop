import { useGroupsStore } from '@modules/groups/store'
import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { IGroup } from '@proshop/types'

export const useGroupsService = () => {
    const { createGroup: createNewGroup } = useGroupsStore()
    const { getVariants } = useVariantsService()

    const createGroup = async (group: IGroup) => {
        try {
            return await createNewGroup(group)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const loadVariants = async () => {
        try {
            await getVariants()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        createGroup,
        loadVariants
    }
}
