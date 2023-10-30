import { IFavorite, IFavoriteMongoModel } from '@proshop/types'

export class AttributeMapper {
    static toDomain(entity: IFavoriteMongoModel): IFavorite {
        const { _id } = entity
        const map: Partial<IFavoriteMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IFavorite

    }

    static toMongoModelData(domainModel: IFavorite): IFavoriteMongoModel {
        const { id } = domainModel
        const map: Partial<IFavorite> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IFavoriteMongoModel
    }
}
