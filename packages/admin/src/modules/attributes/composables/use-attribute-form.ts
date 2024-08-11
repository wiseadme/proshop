import { ref, unref } from 'vue'


import { useAttributeModel } from '@modules/attributes/composables/use-attribute-model'
import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import {
    ATTRIBUTE_CREATED,
    ATTRIBUTE_CREATE_ERROR,
} from '@modules/attributes/constants/notifications'


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
