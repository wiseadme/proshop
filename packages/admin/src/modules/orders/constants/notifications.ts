import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const ORDER_UPDATE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Не удалось сохранить изменения в заказе',
    type: 'error',
})

export const ORDER_STATUS_ALREADY_EXISTS_ERROR: Notify = markRaw({
    title: 'Информация',
    text: `Заказ уже имеет выбранный статус`,
    type: 'warning',
    closeOnClick: true,
})

export const ORDER_EXECUTOR_NOT_SELECTED_WARNING: Notify = markRaw({
    title: 'Информация',
    text: 'Необходимо выбрать исполнителя заказа',
    type: 'warning',
    closeOnClick: true,
})
