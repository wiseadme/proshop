import type { ICart, ICartMongoModel } from '@proshop-app/types'
import { ProductMapper } from '@modules/products/mappers/product.mapper'

export class CartMapper {
    static toDomain(entity: ICartMongoModel): ICart {
        const { _id } = entity
        const map: Partial<ICartMongoModel> = entity

        delete map._id

        map.items = map.items?.map(it => {
            it.product = ProductMapper.toDomain(it.product as any)
            return it
        })

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
