import { IGroupRepository } from '@modules/group/types/repository'
import { IGroup } from '@proshop/types'
import { GroupModel } from '@modules/group/model/group.model'
import { GroupMapper } from '@modules/group/mappers/mongo.mapper'
import mongoose from 'mongoose'
import { injectable } from 'inversify'

@injectable()
export class GroupRepository implements IGroupRepository {
    async createGroup(model: IGroup): Promise<IGroup> {
        const group = await new GroupModel({
            ...GroupMapper.toMongoModelData(model),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return GroupMapper.toDomain(group)
    }

    async getGroups({ id }: { id: string }): Promise<IGroup[]> {
        const data = await GroupModel
            .find( id && { _id: id } || {})
            .lean()

        return data.map(it => GroupMapper.toDomain(it))
    }
}
