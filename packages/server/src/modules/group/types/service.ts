import { IGroup } from '@proshop/types'

export interface IGroupService {
    create(group: IGroup): Promise<IGroup>
}
