import { useNotifications } from '@shared/components/VNotifications/use-notifications'
// import {Notify} from '@shared/components/VNotifications/types'

export const useAppNotifications = () => {
    const { notify } = useNotifications()

    const noChangesNotification = () => notify({
        title: 'Нет изменений',
        text: 'Отсутствуют какие - либо изменения для сохранения',
        type: 'error',
    })

    const changesSavedNotification = () => notify({
        title: 'Сохранено',
        text: 'Изменения успешно сохранены',
        type: 'success'
    })

    return {
        noChangesNotification,
        changesSavedNotification
    }
}
