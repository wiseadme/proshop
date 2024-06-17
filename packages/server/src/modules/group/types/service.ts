import { IGroup } from '@proshop/types'

export interface IGroupService {
    createGroup(group: IGroup): Promise<IGroup>
    getGroups(params?: {id: string}): Promise<IGroup[]>
    deleteGroup(id: string): Promise<boolean>
    updateGroup(updates: Partial<IGroup>): Promise<IGroup>
}
