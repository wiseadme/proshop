import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { AttributeModel } from '@modules/attribute/model/attribute.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IAttribute } from '@ecommerce-platform/types'
import { IAttributeRepository } from '../types/repository'

@injectable()
export class AttributeRepository implements IAttributeRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(attribute: IAttribute): Promise<IAttribute & Document> {
        return new AttributeModel({
            _id: new mongoose.Types.ObjectId(),
            key: attribute.key,
            value: attribute.value,
            meta: attribute.meta,
            order: attribute.order,
        }).save()
    }

    async read(id?: string): Promise<Array<IAttribute & Document>> {
        const attrs = await AttributeModel.find(id ? { _id: id } : {})

        return attrs as Array<IAttribute & Document>
    }

    async update(updates: Partial<IAttribute> & Required<{ _id: string }>): Promise<{
        updated: IAttribute & Document
    }> {
        validateId(updates._id)

        const updated = await AttributeModel.findByIdAndUpdate(
            { _id: updates._id },
            { $set: updates },
            { new: true },
        ) as IAttribute & Document

        return { updated }
    }

    async delete(id) {
        return !!await AttributeModel.findByIdAndDelete(id)
    }
}
