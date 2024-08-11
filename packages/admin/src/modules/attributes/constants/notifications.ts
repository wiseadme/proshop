import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const ATTRIBUTE_CREATED: Notify = markRaw({
    title: 'Успех!',
    text: 'Атрибут успешно создан!',
    type: 'success',
})

export const ATTRIBUTE_CREATE_ERROR: Notify = markRaw({
    title: 'Ошибка!',
    text: 'Ошибка создания атрибута!',
    type: 'error',
})

export const ATTRIBUTE_DELETED: Notify = markRaw({
    title: 'Успех!',
    text: 'Атрибут успешно удален!',
    type: 'success',
})
