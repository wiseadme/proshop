import type { IFilterGroup, IFilterItem } from '@proshop-app/types'

export const state = () => ({
    filterGroups: [] as IFilterGroup[],
    filterItems: [] as IFilterItem[]
})
