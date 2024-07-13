import type { IGroup, IGroupMongoModel, IVariantMongoModel } from '@proshop/types'
import { VariantMapper } from '@modules/variant/mappers/variant.mapper'

export class GroupMapper {
    static toDomain(entity: IGroupMongoModel): IGroup {
        const { _id } = entity
        const map: Partial<IGroupMongoModel> = { ...entity }

        delete map._id

        return {
            id: _id,
            ...map,
            variant: VariantMapper.toDomain(map.variant as unknown as IVariantMongoModel),
        } as IGroup
    }

    static toMongoModelData(domainModel: IGroup): IGroupMongoModel {
        const { id } = domainModel
        const map: Partial<IGroup> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IGroupMongoModel
    }
}
