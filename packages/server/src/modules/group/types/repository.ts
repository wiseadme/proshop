import { IGroup } from '@proshop/types'

export interface IGroupRepository {
    create(model: IGroup): Promise<IGroup>
}
