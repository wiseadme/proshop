import { ISettingsMongoModel, ISettings, IMerchantMongoModel, ISiteMongoModel, Maybe } from '@proshop/types'
import { MerchantMapper } from '@modules/settings/mappers/merchant.mapper'
import { SiteMapper } from '@modules/settings/mappers/site.mapper'

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
