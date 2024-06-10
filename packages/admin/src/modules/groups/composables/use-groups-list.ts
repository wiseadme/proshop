import { useGroupsService } from '@modules/groups/composables/use-groups-service'

export const useGroupsList = () => {
    const {
        readOnlyGroups: groups,
        getGroups
    } = useGroupsService()

    const onDeleteGroup = (id: string) => {
        console.log('deleteGroup', id)
    }

    const onEditGroup = (id: string) => {
        console.log('editGroup', id)
    }

    return {
        groups,
        getGroups,
        onDeleteGroup,
        onEditGroup
    }
}
