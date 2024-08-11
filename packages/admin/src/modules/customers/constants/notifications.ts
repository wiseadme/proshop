import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const CUSTOMERS_LOADING_ERROR: Notify = markRaw({
    title: 'Ошибка загрузки',
    text: 'Не удалось загрузить список клиентов',
    type: 'error',
})
