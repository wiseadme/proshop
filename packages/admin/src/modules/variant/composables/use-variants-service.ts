import { useVariantsStore } from "@modules/variant/store"
import { computed } from "vue"
import { IVariant } from "@ecommerce-platform/types"

export const useVariantsService = () => {
  const _store = useVariantsStore()

  const variants = computed<Maybe<IVariant[]>>(() => _store.variants)

  const createVariant = (item: IVariant) => {
    return _store.create(item)
  }

  const deleteVariant = (id: string) => {
    return _store.delete(id)
  }

  const getVariants = (params = {}) => {
    return _store.read(params)
  }

  return {
    variants,
    createVariant,
    deleteVariant,
    getVariants
  }
}