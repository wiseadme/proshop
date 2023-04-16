import {
  computed,
  ref,
  unref
} from 'vue'
import { useUnitsStore } from "@modules/unit/store"
import { IUnit } from "@ecommerce-platform/types"
import { createSharedComposable } from "@shared/features/create-shared-composable"

export const useUnitsService = createSharedComposable(() => {
  const _store = useUnitsStore()
  const unit = ref<Maybe<IUnit>>(null)

  const units = computed(() => _store.units)

  const setAsCurrent = (item: IUnit) => {
    unit.value = item
  }

  const createUnit = (item: IUnit) => {
    return _store.create(item)
  }

  const updateUnit = (updates: Partial<IUnit>) => {
    updates._id = unref(unit)!._id

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
