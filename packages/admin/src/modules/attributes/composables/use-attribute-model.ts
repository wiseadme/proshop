import {
    computed,
    ref,
    unref,
    watch
} from 'vue'

import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { Attribute } from '@modules/attributes/model/attribute.model'


import { IAttribute } from '@proshop-app/types'

export const useAttributeModel = createSharedComposable(() => {
    const { attribute } = useAttributesService()
    const model = ref<IAttribute>(Attribute.create())

    const setAttributeModel = (value?: IAttribute) => {
        model.value = value || Attribute.create()
    }

    const isEditMode = computed(() => Boolean(unref(model).id))

    watch(attribute, setAttributeModel, { immediate: true })

    return {
        model,
        isEditMode,
        setAttributeModel,
    }
})
