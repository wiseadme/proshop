import { IGroup } from '@proshop/types'

export interface IGroupRepository {
    createGroup(model: IGroup): Promise<IGroup>

    getGroups(params?: { id: string }): Promise<IGroup[]>
}