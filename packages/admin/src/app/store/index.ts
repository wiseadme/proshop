import { createNervue } from 'nervue'
// stores
import { useAttributeStore } from '@modules/attribute/store'
import { useCategoryStore } from '@modules/category/store'
import { useVariantStore } from '@modules/variant/store'
import { useUnitStore } from '@modules/unit/store'
import { useProductStore } from '@modules/product/store'

export const store = createNervue()

store.set(useAttributeStore)
store.set(useCategoryStore)
store.set(useProductStore)
store.set(useVariantStore)
store.set(useUnitStore)
