import { ISettingsMongoModel, ISettings, Maybe } from '@proshop-app/types'

export class SettingsMapper {
    static toDomain(entity: ISettingsMongoModel): Maybe<ISettings> {
        if (!entity) return null

        const map = { ...entity }

        // @ts-ignore
        delete map._id

        return {
            id: entity._id,
            ...map
        } as ISettings
    }

    static toMongoModelData(domainModel: Partial<ISettings>): Maybe<ISettingsMongoModel> {
        if (!domainModel) return null

        const { id } = domainModel
        const map = { ...domainModel } as Record<string, any>

        map.site = map.site?.id
        map.merchant = map.merchant?.id

        delete map.id

        return {
            _id: id,
            ...map,
        } as ISettingsMongoModel
    }
}
