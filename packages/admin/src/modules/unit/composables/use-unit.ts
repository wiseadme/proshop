import { ref, unref } from 'vue'
import { IUnit } from '@proshop/types'
import { Unit } from '@modules/unit/model/unit.model'
import { useUnitsService } from '@modules/unit/composables/use-units-service'
import { useLoadingState } from '@shared/composables/use-loading-state'

export const useUnit = () => {
    const { updateUnit, createUnit, deleteUnit, setAsCurrent } = useUnitsService()
    const { loading, setLoadingState } = useLoadingState()

    const model = ref<IUnit>(Unit.create())
    const isEditMode = ref(false)

    const onSaveUnit = (validate) => {
        setLoadingState(true)

        let promise

        validate().then(() => {
            if (unref(isEditMode)) {
                promise = updateUnit(unref(model))
            } else {
                promise = createUnit(unref(model))
            }

            promise.then(() => setLoadingState(false))
        })
    }
    const clearUnitModel = () => {
        model.value = Unit.create()
    }

    const onEditUnit = (item) => {
        isEditMode.value = true
        setAsCurrent(item)
        model.value = Unit.create(item)
    }

    const onDeleteUnit = (id) => {
        return deleteUnit(id)
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
