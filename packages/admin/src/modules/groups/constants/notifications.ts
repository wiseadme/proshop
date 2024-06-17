import { markRaw } from 'vue'
import { Notify } from '@shared/components/VNotifications/types'

export const GROUP_DELETE_ERROR: Notify = markRaw({
    title: 'Ошибка удаления',
    text: 'Группа не удалена, возникла ошибка.',
    type: 'error'
})
