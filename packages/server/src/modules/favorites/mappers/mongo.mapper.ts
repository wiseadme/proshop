import { IFavorite, IFavoriteMongoModel, IAttribute, Maybe } from '@proshop/types'

export class FavoriteMapper {
    static toDomain(entity: IFavoriteMongoModel): Maybe<IFavorite> {
        if (!entity) return null

        const { _id } = entity
        const map: Partial<IFavoriteMongoModel> = { ...entity }
        const product = map.product?.[0]

        delete map._id
        delete map.userId
        delete product._id

        return {
            id: _id,
            ...map,
            product
        } as IFavorite
    }

    static toMongoModelData(domainModel: IFavorite): Maybe<IFavoriteMongoModel> {
        if (!domainModel) return null

        const { id } = domainModel
        const map: Partial<IFavorite> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IFavoriteMongoModel
    }
}
