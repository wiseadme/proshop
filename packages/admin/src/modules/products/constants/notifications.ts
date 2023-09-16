import { Notify } from '@shared/components/VNotifications/types'

export const PRODUCT_DELETED: Notify = {
    title: 'Удаление товара',
    text: 'Операция выполнена успешно!',
    type: 'success'
}

export const PRODUCT_DELETE_ERROR: Notify = {
    title: 'Ошибка удаления',
    text: 'Товар не удален, возникла ошибка.',
    type: 'error'
}
