import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const ORDER_UPDATE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Не удалось сохранить изменения в заказе',
    type: 'error',
})
