import { markRaw } from 'vue'
import { Notify } from '@shared/components/VNotifications/types'

export const PRODUCT_DELETED: Notify = markRaw({
    title: 'Удаление товара',
    text: 'Товар успешно удален!',
    type: 'success',
})

export const PRODUCT_DELETE_ERROR: Notify = markRaw({
    title: 'Ошибка удаления',
    text: 'Товар не удален, возникла ошибка.',
    type: 'error'
})

export const PRODUCT_IMAGE_SAVED: Notify = markRaw({
    title: 'Сохранено',
    text: 'Картинка товара успешно сохранена!',
    type: 'success',
})

export const PRODUCT_IMAGE_DELETED: Notify = markRaw({
    title: 'Успешно удалено',
    text: 'Картинка товара успешно удалена!',
    type: 'success',
})
