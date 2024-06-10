import { computed } from 'vue'
import { useVariantsStore } from '@modules/variants/store'
import { IVariant } from '@proshop/types'

export const useVariantsService = () => {
    const _store = useVariantsStore()

    const variants = computed<IVariant[]>(() => _store.variants ?? [])

    const createVariant = async (item: IVariant) => {
        try {
            return await _store.create(item)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateVariant = async (updates: Partial<IVariant>) => {
        try {
            return await _store.update(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteVariant = async (id: string) => {
        try {
            return await _store.delete(id)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getVariants = async (params = {}) => {
        try {
            return await _store.read(params)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        variants,
        createVariant,
        deleteVariant,
        updateVariant,
        getVariants
    }
}
