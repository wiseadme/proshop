import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { OptionModel } from '@modules/options/model/option.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOption, IOptionMongoModel } from '@proshop/types'
import { IOptionRepository } from '../types/repository'
import { OptionMapper } from '@modules/options/mappers/option.mapper'

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

    async update(updates: Partial<IOption>): Promise<IOption> {
        validateId(updates.id)

        const option = await OptionModel
            .findByIdAndUpdate(
                { _id: updates.id },
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
