import { useAttributeStore } from '@modules/attribute/store'
import { useCategoryStore } from '@modules/category/store'
import { useVariantStore } from '@modules/variant/store'
import { useUnitStore } from '@modules/unit/store'

export const initStoreExposes = () => {
  useCategoryStore()
  useAttributeStore()
  useUnitStore()
  useVariantStore()
}
