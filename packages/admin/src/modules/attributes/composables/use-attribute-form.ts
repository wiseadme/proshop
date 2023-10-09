import { ref, unref } from 'vue'
import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
import { useAttributeModel } from '@modules/attributes/composables/use-attribute-model'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import {
    ATTRIBUTE_CREATED,
    ATTRIBUTE_CREATE_ERROR,
} from '@modules/attributes/constants/notifications'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useAttributeForm = createSharedComposable(() => {
    const { createAttribute, updateAttribute } = useAttributesService()
    const { model, isEditMode } = useAttributeModel()
    const { notify } = useNotifications()

    const isFormVisible = ref(false)

    const onCreateAttribute = async () => {
        try {
            await createAttribute(unref(model))

            notify(ATTRIBUTE_CREATED)
        } catch {
            notify(ATTRIBUTE_CREATE_ERROR)
        }
    }

    const onUpdateAttribute = async () => {
        try {
            await updateAttribute(unref(model))

            notify(ATTRIBUTE_CREATED)
        } catch {
            notify(ATTRIBUTE_CREATE_ERROR)
        }
    }

    const onSubmit = (validate: () => Promise<boolean>) => {
        validate().then(() => unref(isEditMode) ? onUpdateAttribute() : onCreateAttribute())
    }

    return {
        isFormVisible,
        onCreateAttribute,
        onUpdateAttribute,
        onSubmit,
    }
})
