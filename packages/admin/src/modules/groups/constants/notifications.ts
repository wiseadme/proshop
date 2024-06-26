import { markRaw } from 'vue'

import { NotificationTypes, Notify } from '@shared/components/VNotifications/types'

export const OPTION_CREATE_SUCCESS: Notify = markRaw({
    title: 'Успешно!',
    text: 'Опция создана!',
    type: NotificationTypes.SUCCESS,
    closeOnClick: true
})

export const OPTION_DELETE_SUCCESS: Notify = markRaw({
    title: 'Успешно!',
    text: 'Опция удалена!',
    type: NotificationTypes.SUCCESS,
    closeOnClick: true
})

export const OPTION_CREATE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Опция не создана, возникла ошибка.',
    type: NotificationTypes.ERROR,
    closeOnClick: true
})

export const OPTION_DELETE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Опция не удалена, возникла ошибка.',
    type: NotificationTypes.ERROR,
    closeOnClick: true
})

export const GROUP_CREATE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Группа не создана, возникла ошибка.',
    type: NotificationTypes.ERROR,
    closeOnClick: true
})

export const GROUP_DELETE_ERROR: Notify = markRaw({
    title: 'Ошибка',
    text: 'Группа не удалена, возникла ошибка.',
    type: NotificationTypes.ERROR,
    closeOnClick: true
})

export const GROUP_DELETE_WARNING: Notify = markRaw({
    title: 'Предупреждение!',
    text: 'Группа не может быть удалена, сначала удалите опции.',
    type: NotificationTypes.WARNING,
    closeOnClick: true
})
