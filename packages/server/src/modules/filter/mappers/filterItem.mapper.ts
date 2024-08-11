import { IFilterItem, IFilterItemMongoModel } from '@proshop-app/types'

export class FilterItemMapper {
    static toDomain(entity: IFilterItemMongoModel): IFilterItem {
        const { _id } = entity
        const map: Partial<IFilterItemMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IFilterItem

    }

    static toMongoModelData(domainModel: IFilterItem): IFilterItemMongoModel {
        const map: Partial<IFilterItem> = domainModel
        const { id } = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IFilterItemMongoModel
    }
}
