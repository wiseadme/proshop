import {
    computed,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import type { IUnit } from '@proshop-app/types'

import { useUnitsStore } from '@modules/units/store'

export const useUnitsService = createSharedComposable(() => {
    const _store = useUnitsStore()
    const unit = ref<Maybe<IUnit>>(null)

    const units = computed(() => _store.units ?? [])

    const setAsCurrent = (item: IUnit) => {
        unit.value = item
    }

    const createUnit = (item: IUnit) => {
        return _store.create(item)
    }

    const updateUnit = (updates: Partial<IUnit>) => {
        updates.id = unref(unit)!.id

        return _store.update(updates)
    }

    const deleteUnit = (id: string) => {
        return _store.delete(id)
    }

    const getUnits = (params: Partial<IUnit> = {}) => {
        return _store.read(params)
    }

    return {
        unit,
        units,
        setAsCurrent,
        createUnit,
        updateUnit,
        deleteUnit,
        getUnits
    }
})
