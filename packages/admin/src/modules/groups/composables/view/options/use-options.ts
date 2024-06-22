import { useOptionsService } from '@modules/groups/composables/services/use-options-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
// Constants
import { OPTION_CREATE_ERROR, OPTION_CREATE_SUCCESS } from '@modules/groups/constants/notifications'
// Types
import type { IOption } from '@proshop/types'

export const useOptions = () => {
    const {
        readOnlyOptions,
        createOption,
        getOptions
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

    return {
        options: readOnlyOptions,
        getOptions,
        onCreateOption
    }
}
