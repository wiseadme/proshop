import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const CATEGORY_DELETED: Notify = markRaw({
    title: 'Успешно удалено',
    text: 'Категория успешно удалена!',
    type: 'success',
})

export const CATEGORY_FILTERS_UPDATED: Notify = markRaw({
    title: 'Успешно изменено',
    text: 'Фильтры категория успешно изменены!',
    type: 'success',
})

export const CATEGORY_SAVING_ERROR: Notify = markRaw({
    title: 'Ошибка сохранения',
    text: 'Изменения не сохранены, ошибка сервера',
    type: 'error',
})

export const CATEGORY_IMAGE_SAVED: Notify = markRaw({
    title: 'Сохранено',
    text: 'Картинка категории успешно сохранена!',
    type: 'success',
})

export const CATEGORY_IMAGE_DELETED: Notify = markRaw({
    title: 'Успешно удалено',
    text: 'Картинка категории успешно удалена!',
    type: 'success',
})
