import { ref, unref, watch } from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { ICategory } from '@ecommerce-platform/types'
import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductCategories = createSharedComposable(() => {
  const { model, isEditMode } = useProduct()
  const { showModal } = useProductActionsModal()

  const categoriesMap = ref<Map<string, ICategory>>(new Map())

  const toggleCategory = (ctg) => {
    const category = unref(categoriesMap).get(ctg._id)

    category ? unref(categoriesMap).delete(ctg._id) : unref(categoriesMap).set(ctg._id, ctg)
    unref(model).categories = Array.from(unref(categoriesMap).values())
  }

  watch(showModal, (state) => {
    unref(categoriesMap).clear()

    if (!state || !unref(isEditMode)) return

    unref(model)!.categories.forEach(ctg => {
      if (!unref(categoriesMap).get(ctg._id!)) toggleCategory(ctg)
    })
  })

  return {
    categoriesMap,
    toggleCategory
  }
})
