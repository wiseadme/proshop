import { ref, unref } from 'vue'
import { Unit } from '@modules/units/model/unit.model'
import { useUnitsService } from '@modules/units/composables/use-units-service'
import { useLoadingState } from '@shared/composables/use-loading-state'
import { IUnit } from '@proshop/types'

export const useUnit = () => {
    const { updateUnit, createUnit, deleteUnit, setAsCurrent } = useUnitsService()
    const { loading, setLoadingState } = useLoadingState()

    const model = ref<IUnit>(Unit.create())
    const isEditMode = ref(false)

    const onSaveUnit = (validate) => {
        setLoadingState(true)

        const fn = unref(isEditMode) ? updateUnit : createUnit

        validate()
            .then(() => fn(unref(model)))
            .catch(() => setLoadingState(false))
    }
    const clearUnitModel = () => {
        model.value = Unit.create()
    }

    const onEditUnit = (item) => {
        isEditMode.value = true
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
        onSaveUnit,
        onEditUnit,
        clearUnitModel,
        onDeleteUnit
    }
}