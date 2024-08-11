import mongoose from 'mongoose'
import { injectable } from 'inversify'
import { MetaTagModel } from '@modules/metatag/model/metatag.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { IMetaTag, IMetaTagMongoModel } from '@proshop-app/types'
import { MetatagMapper } from '@modules/metatag/mappers/metatag.mapper'

@injectable()
export class MetaTagRepository implements IMetaTagRepository {
    async create(metaTag: IMetaTag): Promise<IMetaTag> {
        const metaTagData = await new MetaTagModel({
            ...MetatagMapper.toMongoModelData(metaTag),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return MetatagMapper.toDomain(metaTagData.toObject())
    }

    async read(params: Partial<IMetaTag>) {
        const metaTags = await MetaTagModel
            .find(params)
            .lean() as IMetaTagMongoModel[]

        return metaTags.map(metaTag => MetatagMapper.toDomain(metaTag))
    }

    async update(updates: Partial<IMetaTag>) {
        validateId(updates.id!)

        const updated = await MetaTagModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IMetaTagMongoModel

        return MetatagMapper.toDomain(updated)
    }

    async delete(id: string) {
        validateId(id)

        await MetaTagModel.findByIdAndDelete(id)

        return true
    }
}
