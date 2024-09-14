import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { OptionModel } from '@modules/options/model/option.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { OptionMapper } from '@modules/options/mappers/option.mapper'
// Types
import type { ILogger } from '@/types/utils'
import type { IOption, IOptionMongoModel } from '@proshop-app/types'
import type { IOptionRepository } from '@modules/options/types/repository'

@injectable()
export class OptionRepository implements IOptionRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(option: IOption): Promise<IOption> {
        const optionData = await new OptionModel({
            ...OptionMapper.toMongoModelData(option),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return OptionMapper.toDomain(optionData.toObject())
    }

    async find(params = {}): Promise<IOption[]> {
        const options = await OptionModel
            .find(params)
            .lean() as IOptionMongoModel[]

        return options.map(option => OptionMapper.toDomain(option))
    }

    async findMany(ids: string): Promise<IOption[]> {
        const arr = JSON.parse(decodeURIComponent(ids))

        const options = await OptionModel.find({
            groupId: { $in: arr },
        })
            .lean()

        return options.map(option => OptionMapper.toDomain(option))
    }

    async update(updates: Partial<IOption>): Promise<IOption> {
        validateId(updates.id! ?? updates.productId!)

        const option = await OptionModel
            .findOneAndUpdate(
                {...(updates.id ? { _id: updates.id } : { productId: updates.productId })},
                { $set: updates },
                { new: true },
            )
            .lean() as IOptionMongoModel

        return OptionMapper.toDomain(option)
    }

    async delete(id: string) {
        validateId(id)

        return !!await OptionModel.findByIdAndDelete(id)
    }
}
