import { ISettingsMongoModel, ISettings, IMerchantMongoModel, ISiteMongoModel, Maybe } from '@proshop/types'
import { MerchantMapper } from '@modules/settings/mappers/merchant.mapper'
import { SiteMapper } from '@modules/settings/mappers/site.mapper'

export class SettingsMapper {
    static toDomain(entity: ISettingsMongoModel): Maybe<ISettings> {
        if (!entity) return null

        return {
            id: entity._id,
            merchant: entity.merchant ? MerchantMapper.toDomain(entity.merchant as IMerchantMongoModel) : undefined,
            site: entity.site ? SiteMapper.toDomain(entity.site as ISiteMongoModel) : undefined
        } as ISettings
    }

    static toMongoModelData(domainModel: Partial<ISettings>): Maybe<ISettingsMongoModel> {
        if (!domainModel) return null

        const { id } = domainModel
        const map: Partial<ISettings> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as ISettingsMongoModel
    }
}
