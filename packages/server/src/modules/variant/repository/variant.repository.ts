import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { VariantModel } from '@modules/variant/model/variant.model'
// Types
import { Types } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ILogger } from '@/types/utils'
import { IVariant, IVariantMongoModel } from '@proshop/types'
import { IVariantRepository } from '../types/repository'
import { VariantMapper } from '@modules/variant/mappers/variant.mapper'

@injectable()
export class VariantRepository implements IVariantRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
    }

    async create(variant: IVariant) {
        const variantData = await new VariantModel({
            ...VariantMapper.toMongoModelData(variant),
            _id: new Types.ObjectId(),
        })
            .save()

        return VariantMapper.toDomain(variantData.toObject())
    }

    async read() {
        const variants = await VariantModel
            .find({})
            .lean()

        return variants.map(variant => VariantMapper.toDomain(variant))
    }

    async update($set: Partial<IVariant>) {

        validateId($set.id)

        const updated = await VariantModel.findByIdAndUpdate(
            { _id: $set.id },
            { $set },
            { new: true },
        )
            .lean() as IVariantMongoModel

        return VariantMapper.toDomain(updated)
    }

    async delete(id: string) {
        validateId(id)

        return !!await VariantModel.findOneAndDelete({ _id: id })
    }
}
