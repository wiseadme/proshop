import { IVariant, IVariantMongoModel } from '@proshop/types'

export class VariantMapper {
    static toDomain(entity: IVariantMongoModel): IVariant {
        const { _id } = entity
        const map: Partial<IVariantMongoModel> = { ...entity }

        delete map._id

        return {
            id: _id,
            ...map,
        } as IVariant

    }

    static toMongoModelData(domainModel: IVariant): IVariantMongoModel {
        const { id } = domainModel
        const map: Partial<IVariant> = { ...domainModel }

        delete map.id

        return {
            _id: id,
            ...map,
        } as IVariantMongoModel
    }
}
