import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterGroupModel } from '@modules/filter/model/filterGroup.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IFilterGroup, IFilterGroupMongoModel } from '@proshop-app/types'
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

    async read(params: Partial<IFilterGroup>): Promise<IFilterGroup[]> {
        params.id && validateId(params.id)

        const filterGroups = await FilterGroupModel.find(params).lean()

        return filterGroups.map(filterGroup => FilterGroupMapper.toDomain(filterGroup)) as IFilterGroup[]
    }

    async update(updates: Partial<IFilterGroup>): Promise<IFilterGroup> {
        validateId(updates.id!)

        const filterGroup = await FilterGroupModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IFilterGroupMongoModel

        return FilterGroupMapper.toDomain(filterGroup)
    }

    async delete(id) {
        validateId(id)

        return !!await FilterGroupModel.findByIdAndDelete(id)
    }
}
