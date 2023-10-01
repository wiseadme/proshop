import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { AttributeModel } from '@modules/attribute/model/attribute.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IAttribute, IAttributeMongoModel } from '@proshop/types'
import { IAttributeRepository } from '../types/repository'
import { AttributeMapper } from '@modules/attribute/mappers/attribute.mapper'

@injectable()
export class AttributeRepository implements IAttributeRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(attribute: IAttribute): Promise<IAttribute> {
        const attributeData = await new AttributeModel({
            ...AttributeMapper.toMongoModelData(attribute),
            _id: new mongoose.Types.ObjectId(),
        }).save()

        return AttributeMapper.toDomain(attributeData.toObject())
    }

    async read(id?: string): Promise<IAttribute[]> {
        const attrs = await AttributeModel.find(id ? { _id: id } : {}).lean()

        return attrs.map(attribute => AttributeMapper.toDomain(attribute))
    }

    async update(updates: Partial<IAttribute>): Promise<IAttribute | IAttribute[]> {
        const result = { updated: null } as any

        if (updates.id) {
            validateId(updates.id)

            const attribute = await AttributeModel.findByIdAndUpdate(
                { _id: updates.id },
                { $set: updates },
                { new: true },
            )
                .lean() as IAttributeMongoModel

            result.updated = AttributeMapper.toDomain(attribute)
        }

        if (Array.isArray(updates)) {
            result.updated = []

            for (const item of updates) {
                const attribute = await AttributeModel.findByIdAndUpdate(
                    { _id: updates.id },
                    { $set: updates },
                    { new: true },
                )
                    .lean() as IAttributeMongoModel

                result.updated.push(AttributeMapper.toDomain(attribute))
            }
        }

        return result.updated
    }

    async delete(id: string) {
        return !!await AttributeModel.findByIdAndDelete(id)
    }
}
