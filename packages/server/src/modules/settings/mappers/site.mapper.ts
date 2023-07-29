import { ISite, ISiteMongoModel, Maybe } from '@proshop/types'

export class SiteMapper {
    static toDomain(entity: ISiteMongoModel): Maybe<ISite> {
        if (!entity) return null

        const map: Partial<ISiteMongoModel> = { ...entity }

        delete map._id

        return {
            id: entity._id,
            ...map,
        } as ISite

    }

    static toMongoModelData(domainModel: Partial<ISite>): Maybe<ISiteMongoModel> {
        if (!domainModel) return null

        const map: Partial<ISite> = { ...domainModel }

        delete map.id

        return {
            _id: domainModel?.id,
            ...map,
        } as ISiteMongoModel
    }
}
