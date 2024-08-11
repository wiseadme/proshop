import { IAttribute, IUnit, IUnitMongoModel } from '@proshop-app/types'

export class UnitsMapper {
    static toDomain(entity: IUnitMongoModel): IUnit {
        const { _id } = entity
        const map: Partial<IUnitMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IUnit

    }

    static toMongoModelData(domainModel: IUnit): IUnitMongoModel {
        const { id } = domainModel
        const map: Partial<IUnit> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IUnitMongoModel
    }
}
