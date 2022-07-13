import { useAttributeStore } from '@modules/attribute/store'
import { useCategoryStore } from '@modules/category/store'
import { useVariantStore } from '@modules/variant/store'
import { useUnitStore } from '@modules/unit/store'

const attributes = useAttributeStore()
const units = useUnitStore()
const categories = useCategoryStore()
const variants = useVariantStore()

export const actions = {
  async getUnits() {
    this.units = await units.read()
  },

  async getAttributes() {
    this.attributes = await attributes.read()
  },

  async getCategories() {
    this.categories = await categories.read()
  },

  async getVariants() {
    this.variants = await variants.read()
  }
}
