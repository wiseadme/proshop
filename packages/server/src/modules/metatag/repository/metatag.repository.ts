import mongoose, { Document } from 'mongoose'
import { injectable } from 'inversify'
import { MetaTagModel } from '@modules/metatag/model/metatag.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { IMetaTag } from '@ecommerce-platform/types'

@injectable()
export class MetaTagRepository implements IMetaTagRepository {
    async create(params): Promise<IMetaTag & Document> {

        const metaTag = new MetaTagModel({
            _id: new mongoose.Types.ObjectId(),
            props: params.props,
            order: params.order,
        })

        await metaTag.save()

        return metaTag
    }

    async read(params) {
        return MetaTagModel.find(params)
    }

    async update(updates: Partial<IMetaTag>) {
        validateId(updates._id)

        const updated = await MetaTagModel.findByIdAndUpdate(
            { _id: updates._id },
            { $set: updates },
            { new: true },
        ) as IMetaTag & Document

        return { updated }
    }

    async delete(id) {
        validateId(id)

        await MetaTagModel.findByIdAndDelete(id)

        return true
    }
}
