import { createSharedComposable } from '@shared/features/create-shared-composable'
import {
    computed,
    ref,
    unref,
    watch
} from 'vue'
import { Attribute } from '@modules/attributes/model/attribute.model'
import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
import { IAttribute } from '@proshop/types'

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
