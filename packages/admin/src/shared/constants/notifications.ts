import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const NO_CHANGES: Notify = markRaw({
    title: 'Нет изменений',
    text: 'Отсутствуют какие - либо изменения для сохранения.',
    type: 'warning',
})

export const CHANGES_SAVED: Notify = markRaw({
    title: 'Сохранено',
    text: 'Изменения успешно сохранены!',
    type: 'success',
})

export const SAVING_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Изменения не сохранены. Произошла ошибка.',
    type: 'error',
})
