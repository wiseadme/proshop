import { ref, unref } from 'vue'

import { useUnitsService } from '@modules/units/composables/use-units-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'
import { useLoadingState } from '@shared/composables/use-loading-state'

import { Unit } from '@modules/units/model/unit.model'

import type { IUnit } from '@proshop-app/types'

export const useUnit = createSharedComposable(() => {
    const { updateUnit, createUnit, deleteUnit, setAsCurrent } = useUnitsService()
    const { loading, setLoadingState } = useLoadingState()

    const model = ref<IUnit>(Unit.create())
    const isEditMode = ref(false)
    const showUnitForm = ref(false)

    const onSaveUnit = (validate) => {
        setLoadingState(true)

        const fn = unref(isEditMode) ? updateUnit : createUnit

        validate()
            .then(() => fn(unref(model)))
            .catch((err) => console.log(err))
            .finally(() => setLoadingState(false))
    }
    const clearUnitModel = () => {
        model.value = Unit.create()
    }

    const onEditUnit = (item) => {
        isEditMode.value = true
        showUnitForm.value = true
        setAsCurrent(item)
        model.value = Unit.create(item)
    }

    const onDeleteUnit = (unit: IUnit) => {
        return deleteUnit(unit.id)
    }

    return {
        model,
        loading,
        isEditMode,
        showUnitForm,
        onSaveUnit,
        onEditUnit,
        clearUnitModel,
        onDeleteUnit,
    }
})
