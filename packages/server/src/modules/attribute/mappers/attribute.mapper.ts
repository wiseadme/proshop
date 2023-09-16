import { IAttribute, IAttributeMongoModel } from '@proshop/types'

export class AttributeMapper {
    static toDomain(entity: IAttributeMongoModel): IAttribute {
        const { _id } = entity
        const map: Partial<IAttributeMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IAttribute

    }

    static toMongoModelData(domainModel: IAttribute): IAttributeMongoModel {
        const { id } = domainModel
        const map: Partial<IAttribute> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IAttributeMongoModel
    }
}
