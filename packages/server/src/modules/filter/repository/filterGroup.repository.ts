import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterGroupModel } from '@modules/filter/model/filterGroup.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IFilterGroup, IFilterGroupMongoModel } from '@proshop/types'
import { IFilterGroupRepository } from '../types/repository'
import { FilterGroupMapper } from '@modules/filter/mappers/filterGroup.mapper'

@injectable()
export class FilterGroupRepository implements IFilterGroupRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(filterGroup: IFilterGroup): Promise<IFilterGroup> {

        const filterGroupData = await new FilterGroupModel({
            ...FilterGroupMapper.toMongoModelData(filterGroup),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return FilterGroupMapper.toDomain(filterGroupData.toObject())
    }

    async read(id?: string): Promise<IFilterGroup[]> {
        id && validateId(id)

        const filterGroups = await FilterGroupModel.find(id ? { _id: id } : {}).lean()

        return filterGroups.map(filterGroup => FilterGroupMapper.toDomain(filterGroup)) as IFilterGroup[]
    }

    async update(updates: Partial<IFilterGroup>): Promise<{ updated: IFilterGroup }> {
        validateId(updates.id)

        const filterGroup = await FilterGroupModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IFilterGroupMongoModel

        return { updated: FilterGroupMapper.toDomain(filterGroup) }
    }

    async delete(id) {
        validateId(id)

        return !!await FilterGroupModel.findByIdAndDelete(id)
    }
}
