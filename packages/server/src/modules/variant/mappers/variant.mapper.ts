import { IVariant, IVariantMongoModel } from '@proshop/types'
import { OptionMapper } from '@modules/options/mappers/option.mapper'

export class VariantMapper {
    static toDomain(entity: IVariantMongoModel): IVariant {
        const { _id } = entity
        const map: Partial<IVariantMongoModel> = { ...entity }

        map.options = map.options?.map((option) => OptionMapper.toDomain(option as any))

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
