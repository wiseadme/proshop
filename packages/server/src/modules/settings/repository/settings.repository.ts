import mongoose, { Document, LeanDocument } from 'mongoose'
import { ISettingsRepository } from '@modules/settings/types/repository'
import { ISettings } from '@proshop/types'

import { SettingsModel } from '@modules/settings/model/settings.model'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class SettingsRepository implements ISettingsRepository {
    async create(settings: Partial<ISettings>) {
        return (await (new SettingsModel({
            _id: new mongoose.Types.ObjectId(),
            merchant: settings.merchant,
            site: settings.site,
        }).save())).populate(['merchant', 'site'])
    }

    async read(): Promise<LeanDocument<ISettings>> {
        const [settings] = await SettingsModel.find().lean().populate(['merchant', 'site'])

        return settings
    }

    async update(updates: Partial<ISettings>) {
        const { _id } = updates
        validateId(_id)

        delete updates._id

        const updated = await SettingsModel.findByIdAndUpdate(
            { _id },
            { $set: updates },
            { new: true },
        ) as Document & ISettings

        return { updated }
    }

    async delete(id): Promise<boolean> {
        await SettingsModel.deleteOne({ _id: id })

        return true
    }
}
