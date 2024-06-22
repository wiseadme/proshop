import { useOptionsService } from '@modules/groups/composables/services/use-options-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
// Constants
import {
    OPTION_CREATE_ERROR,
    OPTION_CREATE_SUCCESS,
    OPTION_DELETE_ERROR,
    OPTION_DELETE_SUCCESS
} from '@modules/groups/constants/notifications'
// Types
import type { IOption } from '@proshop/types'

export const useOptions = () => {
    const {
        readOnlyOptions,
        createOption,
        getOptions,
        deleteOption
    } = useOptionsService()
    const { notify } = useNotifications()

    const onCreateOption = async (option: IOption) => {
        try {
            await createOption(option)

            notify(OPTION_CREATE_SUCCESS)
        } catch (err) {
            notify(OPTION_CREATE_ERROR)
        }
    }

    const onDeleteOption = async (option: IOption) => {
        try {
            await deleteOption(option.id)
            notify(OPTION_DELETE_SUCCESS)
        } catch (err) {
            notify(OPTION_DELETE_ERROR)
        }
    }

    return {
        options: readOnlyOptions,
        getOptions,
        onCreateOption,
        onDeleteOption
    }
}
