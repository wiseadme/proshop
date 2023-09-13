import { Notify } from '@shared/components/VNotifications/types'

export const Notifications = Object.freeze({
    NO_CHANGES: {
        title: 'Нет изменений',
        text: 'Отсутствуют какие - либо изменения для сохранения.',
        type: 'error',
    } as Notify,
    CHANGES_SAVED: {
        title: 'Сохранено',
        text: 'Изменения успешно сохранены!',
        type: 'success',
    },
    SAVING_ERROR: {
        title: 'Ошибка',
        text: 'Произошла ошибка, изменения не сохранены!',
        type: 'error',
    }
})
