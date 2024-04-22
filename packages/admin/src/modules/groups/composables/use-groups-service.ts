import { useGroupsStore } from '@modules/groups/store'
import { IGroup } from '@proshop/types'
import { useVariantsService } from '@modules/variants/composables/use-variants-service.ts'

export const useGroupsService = () => {
    const { createGroup: createNewGroup } = useGroupsStore()
    const { getVariants } = useVariantsService()

    const createGroup = async (group: IGroup) => {
        return await createNewGroup(group)
    }

    const loadInitItems = async () => {
        await getVariants()
    }

    return {
        createGroup,
        loadInitItems
    }
}
