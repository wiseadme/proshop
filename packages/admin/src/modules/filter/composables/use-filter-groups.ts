import { ref, unref } from 'vue'
import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'
import { FilterGroup } from '@modules/filter/model/filterGroup.model'
import { IFilterGroup } from '@proshop/types'

export const useFilterGroups = () => {
    const {
        filterGroups,
        attributes,
        createFilterGroupItem,
        deleteFilterGroupItem
    } = useFilterGroupService()

    const model = ref<IFilterGroup>(FilterGroup.create({}))

    const onSelectAttribute = (attribute) => {
        unref(model).attribute = attribute.key
    }

    const onCreateGroup = (validate) => {
        validate().then(() => createFilterGroupItem(unref(model)))
    }

    const onDeleteGroup = (group: IFilterGroup) => deleteFilterGroupItem(group.id)

    return {
        model,
        attributes,
        filterGroups,
        onCreateGroup,
        onSelectAttribute,
        onDeleteGroup,
    }
}
