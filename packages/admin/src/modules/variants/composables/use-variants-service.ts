import { computed } from 'vue'
import { useVariantsStore } from '@modules/variants/store'
import { IVariant } from '@proshop/types'

export const useVariantsService = () => {
    const _store = useVariantsStore()

    const variants = computed<IVariant[]>(() => _store.variants ?? [])

    const createVariant = (item: IVariant) => {
        return _store.create(item)
    }

    const updateVariant = (updates: Partial<IVariant>) => {
        return _store.update(updates)
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
        updateVariant,
        getVariants
    }
}
