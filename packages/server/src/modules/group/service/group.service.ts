import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { GROUP_IOC } from '@modules/group/di/di.types'
// Types
import { ILogger } from '@/types/utils'
import { IGroup } from '@proshop/types'
import { IGroupService } from '@modules/group/types/service'
import { IGroupRepository } from '@modules/group/types/repository'

@injectable()
export class GroupService implements IGroupService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(GROUP_IOC.IGroupRepository) private repository: IGroupRepository,
    ) {
    }

    async createGroup(group: IGroup) {
        return this.repository.createGroup(group)
    }

    async getGroups(params?: { id: string } | undefined): Promise<IGroup[]> {
        return this.repository.getGroups(params)
    }

    async deleteGroup(id: string): Promise<boolean> {
        return this.repository.deleteGroup(id)
    }

    async updateGroup(updates: Partial<IGroup>): Promise<IGroup> {
        return this.repository.updateGroup(updates)
    }
}
