import { ref } from 'vue'
import { User } from '@modules/user/model/user.model'

export const useUser = () => {
    const model = ref(User.create())
    const isEditMode = ref(false)

    const onEdit = (user) => {
        model.value = user
    }

    return {
        model,
        isEditMode,
        onEdit
    }
}
