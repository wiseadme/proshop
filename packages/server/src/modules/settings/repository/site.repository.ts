import mongoose, { Document, LeanDocument } from 'mongoose'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ISiteRepository } from '@modules/settings/types/repository'
import { ISite } from '@proshop/types'
import { SiteModel } from '@modules/settings/model/site.model'

@injectable()
export class SiteRepository implements ISiteRepository {
    async create(siteConfig: Partial<ISite>) {
        return (await (new SiteModel({
            _id: new mongoose.Types.ObjectId(),
            colors: siteConfig.colors,
        }).save()))
    }

    async read(): Promise<LeanDocument<ISite>> {
        const [settings] = await SiteModel.find().lean()

        return settings
    }

    async update(updates: Partial<ISite>) {
        validateId(updates._id)

        const updated = await SiteModel.findByIdAndUpdate(
            { _id: updates._id },
            { $set: updates },
            { new: true },
        ) as Document & ISite

        return { updated }
    }

    async delete(id): Promise<boolean> {
        await SiteModel.deleteOne({ _id: id })

        return true
    }
}
