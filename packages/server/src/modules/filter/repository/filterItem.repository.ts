import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterItemModel } from '@modules/filter/model/filterItem.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IFilterItem, IFilterItemMongoModel } from '@proshop-app/types'
import { IFilterItemRepository } from '../types/repository'
import { FilterItemMapper } from '@modules/filter/mappers/filterItem.mapper'

@injectable()
export class FilterItemRepository implements IFilterItemRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(filterItem: IFilterItem): Promise<IFilterItem> {
        const itemData = await new FilterItemModel({
            ...FilterItemMapper.toMongoModelData(filterItem),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return FilterItemMapper.toDomain(itemData.toObject())
    }

    async read(params: Partial<IFilterItem> = {}): Promise<IFilterItem[]> {
        params.id && validateId(params.id)

        const filters = await FilterItemModel
            .find(params.id ? { _id: params.id } : params)
            .lean()

        return filters.map(filter => FilterItemMapper.toDomain(filter))
    }

    async findByGroupIds(ids: string[]): Promise<IFilterItem[]> {
        const filters = await FilterItemModel
            .find({ groupId: { $in: ids } })
            .lean()

        return filters.map((filter) => FilterItemMapper.toDomain(filter))
    }

    async update(updates: Partial<IFilterItem>): Promise<IFilterItem> {
        validateId(updates.id!)

        const option = await FilterItemModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IFilterItemMongoModel

        return FilterItemMapper.toDomain(option)
    }

    async delete(id) {
        validateId(id)

        return !!await FilterItemModel.findByIdAndDelete(id)
    }
}
