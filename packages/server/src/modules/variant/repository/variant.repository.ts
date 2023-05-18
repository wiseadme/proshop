import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { VariantModel } from '@modules/variant/model/variant.model'
// Types
import { Document, Types } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ILogger } from '@/types/utils'
import { IVariant } from '@ecommerce-platform/types'
import { IVariantRepository } from '../types/repository'

@injectable()
export class VariantRepository implements IVariantRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
    }

    async create({ group }: IVariant) {
        return new VariantModel({
            _id: new Types.ObjectId(),
            group,
        }).save()
    }

    async read() {
        return VariantModel.find({})
    }

    async update($set: Partial<Document<IVariant>>) {
        validateId($set.id)

        const updated = await VariantModel.findByIdAndUpdate(
            { _id: $set._id },
            { $set },
            { new: true },
        ) as Document<IVariant>

        return { updated }
    }

    async delete(id: string) {
        validateId(id)

        return !!await VariantModel.findOneAndDelete({ _id: id })
    }
}
