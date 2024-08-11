import { IMetaTag, IMetaTagMongoModel } from '@proshop-app/types'

export class MetatagMapper {
    static toDomain(entity: IMetaTagMongoModel): IMetaTag {
        const { _id } = entity
        const map: Partial<IMetaTagMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IMetaTag

    }

    static toMongoModelData(domainModel: IMetaTag): IMetaTagMongoModel {
        const { id } = domainModel
        const map: Partial<IMetaTag> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IMetaTagMongoModel
    }
}
