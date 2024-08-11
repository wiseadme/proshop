import { markRaw } from 'vue'

import { Notify } from '@shared/components/VNotifications/types'

export const META_TAG_SAVED: Notify = markRaw({
    title: 'Успех!',
    text: 'Метатег успешно сохранен!',
    type: 'success',
})

export const META_TAG_SAVING_ERROR: Notify = markRaw({
    title: 'Ошибка!',
    text: 'Ошибка сохранения метатега!',
    type: 'error',
})

export const META_TAG_DELETED: Notify = markRaw({
    title: 'Удалено',
    text: 'Метатег успешно удален!',
    type: 'success',
})

export const META_TAG_DELETE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Метатег не удален, произошла ошибка!',
    type: 'error',
})
