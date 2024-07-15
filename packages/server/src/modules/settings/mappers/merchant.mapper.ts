import { IMerchant, IMerchantMongoModel, Maybe } from '@proshop-app/types'

export class MerchantMapper {
    static toDomain(entity: IMerchantMongoModel): Maybe<IMerchant> {
        if (!entity) return null

        const map: Partial<IMerchantMongoModel> = { ...entity }

        delete map._id

        return {
            id: entity._id.toString(),
            ...map,
        } as IMerchant
    }

    static toMongoModelData(domainModel: IMerchant): Maybe<IMerchantMongoModel> {
        if (!domainModel) return null

        const { id } = domainModel
        const map: Partial<IMerchant> = { ...domainModel }

        delete map.id

        return {
            _id: id,
            ...map,
        } as IMerchantMongoModel
    }
}
