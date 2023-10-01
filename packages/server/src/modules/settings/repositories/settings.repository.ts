import mongoose, { Document, LeanDocument } from 'mongoose'
import { ISettingsRepository } from '@modules/settings/types/repository'
import { ISettings, ISettingsMongoModel, Maybe } from '@proshop/types'

import { SettingsModel } from '@modules/settings/models/settings.model'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'
import { SettingsMapper } from '@modules/settings/mappers/settings.mapper'

@injectable()
export class SettingsRepository implements ISettingsRepository {
    async create(settings: Partial<ISettings>) {

        const settingsData = await new SettingsModel({
            ...SettingsMapper.toMongoModelData(settings),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        await settingsData.populate(['merchant', 'site'])

        return SettingsMapper.toDomain(settingsData.toObject())!
    }

    async read(): Promise<Maybe<ISettings>> {
        const [settings] = await SettingsModel
            .find()
            .lean()
            // .populate(['merchant', 'site'])

        return SettingsMapper.toDomain(settings)
    }

    async update(updates: Partial<ISettings>) {
        validateId(updates.id)

        const updated = await SettingsModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        ) as ISettingsMongoModel

        return SettingsMapper.toDomain(updated)!
    }

    async delete(id): Promise<boolean> {
        await SettingsModel.deleteOne({ _id: id })

        return true
    }
}
