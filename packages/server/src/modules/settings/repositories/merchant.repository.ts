import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { IMerchant, IMerchantMongoModel } from '@proshop-app/types'
import { IMerchantRepository } from '@modules/settings/types/repository'
import { validateId } from '@common/utils/mongoose-validate-id'
import { MerchantModel } from '@modules/settings/models/merchant.model'
import {MerchantMapper} from '@modules/settings/mappers/merchant.mapper'

@injectable()
export class MerchantRepository implements IMerchantRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(merchant: IMerchant) {
        const merchantData = await new MerchantModel({
            ...MerchantMapper.toMongoModelData(merchant),
            _id: new mongoose.Types.ObjectId(),
        }).save()

        return MerchantMapper.toDomain(merchantData.toObject())!
    }

    async read() {
        // validateId(params.id)

        const [merchant] = await MerchantModel.find()
            .lean()

        return MerchantMapper.toDomain(merchant)
    }

    async update(updates: Partial<IMerchant>) {
        validateId(updates.id!)

        const updated = await MerchantModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IMerchantMongoModel

        return MerchantMapper.toDomain(updated)!
    }

    async delete(id): Promise<boolean> {
        return !!await MerchantModel.findByIdAndDelete(id)
    }
}
