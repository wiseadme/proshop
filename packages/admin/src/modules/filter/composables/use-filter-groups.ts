import { ref, unref } from 'vue'
import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'
import { FilterGroup } from '@modules/filter/model/filterGroup.model'

export const useFilterGroups = () => {
    const {
        filterGroups,
        attributes,
        createFilterGroupItem,
    } = useFilterGroupService()

    const model = ref(FilterGroup.create({}))

    const onSelectAttribute = (attribute) => {
        unref(model).attributeName = attribute.key
    }

    const onCreateGroup = (validate) => {
        validate().then(() => createFilterGroupItem(unref(model)))
    }

    return {
        model,
        attributes,
        filterGroups,
        onCreateGroup,
        onSelectAttribute,
    }
}
