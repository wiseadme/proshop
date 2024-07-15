import { IFilterGroup, IFilterGroupMongoModel } from '@proshop-app/types'

export class FilterGroupMapper {
    static toDomain(entity: IFilterGroupMongoModel): IFilterGroup {
        const { _id } = entity
        const map: Partial<IFilterGroupMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IFilterGroup

    }

    static toMongoModelData(domainModel: IFilterGroup): IFilterGroupMongoModel {
        const map: Partial<IFilterGroup> = domainModel
        const { id } = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IFilterGroupMongoModel
    }
}
