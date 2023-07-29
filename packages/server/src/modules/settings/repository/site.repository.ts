import mongoose from 'mongoose'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ISiteRepository } from '@modules/settings/types/repository'
import { ISite, ISiteMongoModel, Maybe } from '@proshop/types'
import { SiteModel } from '@modules/settings/model/site.model'
import { SiteMapper } from '@modules/settings/mappers/site.mapper'

@injectable()
export class SiteRepository implements ISiteRepository {
    async create(siteConfig: Partial<ISite>) {
        const siteData = await new SiteModel({
            ...SiteMapper.toMongoModelData(siteConfig),
            _id: new mongoose.Types.ObjectId(),
        }).save()

        return SiteMapper.toDomain(siteData.toObject())!
    }

    async read(): Promise<Maybe<ISite>> {
        const [site] = await SiteModel.find().lean()

        return SiteMapper.toDomain(site)
    }

    async update(updates: Partial<ISite>) {
        validateId(updates.id)

        const updated = await SiteModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as ISiteMongoModel

        return { updated: SiteMapper.toDomain(updated)! }
    }

    async delete(id): Promise<boolean> {
        await SiteModel.deleteOne({ _id: id })

        return true
    }
}
