import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { OptionModel } from '@modules/option/model/option.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOption } from '@proshop/types'
import { IOptionRepository } from '../types/repository'

@injectable()
export class OptionRepository implements IOptionRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(option: IOption): Promise<Document & IOption> {
        return (await new OptionModel({
            _id: new mongoose.Types.ObjectId(),
            name: option.name,
            variantId: option.variantId,
            price: option.price,
            quantity: option.quantity,
            description: option.description,
            assets: option.assets,
        })
            .save() as any)
            .populate('assets')
    }

    async read(id?: string): Promise<Array<Document & IOption>> {
        id && validateId(id)

        const options = await OptionModel
            .find(id ? { _id: id } : {})
            .populate('assets')

        return options as Array<Document & IOption>
    }

    async update(updates: Partial<IOption>): Promise<{ updated: Document & IOption }> {
        validateId(updates._id)

        const option = await OptionModel
            .findByIdAndUpdate(
            { _id: updates._id },
            { $set: updates },
            { new: true },
        )
            .populate('assets') as Document & IOption

        return { updated: option }
    }

    async delete(id) {
        validateId(id)

        return !!await OptionModel.findByIdAndDelete(id)
    }
}
