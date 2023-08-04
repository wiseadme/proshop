import { IFilterGroup, IFilterItem } from '@proshop/types'

export const state = () => ({
    filterGroups: [] as IFilterGroup[],
    filterItems: [] as IFilterItem[]
})
