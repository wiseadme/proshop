import { ref } from 'vue'
import { FilterItem } from '@modules/filter/model/filterItem.model'

export const useFilterItemForm = () => {
    const model = ref(FilterItem.create())
    const isEditMode = ref(false)

    return {
        model,
        isEditMode,
    }
}
