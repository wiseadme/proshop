import { onBeforeUnmount, onMounted } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'

export const useButtonsPanel = ({
    title = 'Основная информация',
    onOk,
    onDismiss
}) => {
    const { notify, remove } = useNotifications()

    let notifyId: number

    const notifyParams: Notify = {
        title,
        type: 'info',
        closeOnClick: false,
        actions: {
            buttons: {
                ok: {
                    type: 'success',
                    label: 'Сохранить',
                    handler: onOk
                },
                dismiss: {
                    type: 'warning',
                    label: 'Отмена',
                    handler: onDismiss
                }
            }
        }
    }

    onMounted(() => {
        notifyId = notify(notifyParams)
    })

    onBeforeUnmount(() => {
        remove(notifyId)
    })

    return {
        notifyParams,
    }
}
