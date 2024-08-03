import type { ICart, ICartMongoModel } from '@proshop-app/types'

export class CartMapper {
    static toDomain(entity: ICartMongoModel): ICart {
        const { _id } = entity
        const map: Partial<ICartMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as ICart

    }

    static toMongoModelData(domainModel: ICart): ICartMongoModel {
        const { id } = domainModel
        const map: Partial<ICart> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as ICartMongoModel
    }
}
