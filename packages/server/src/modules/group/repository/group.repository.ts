import { IGroupRepository } from '@modules/group/types/repository'
import { IGroup } from '@proshop/types'
import { GroupModel } from '@modules/group/model/group.model'
import { GroupMapper } from '@modules/group/mappers/mongo.mapper'
import mongoose from 'mongoose'

export class GroupRepository implements IGroupRepository {
    async create(model: IGroup): Promise<IGroup> {
        const group = await GroupModel.create({
            ...GroupMapper.toMongoModelData(model),
            _id: new mongoose.Types.ObjectId(),
        })

        return GroupMapper.toDomain(group)
    }
}
