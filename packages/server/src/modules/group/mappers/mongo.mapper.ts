import type { IGroup, IGroupMongoModel } from '@proshop/types'

export class GroupMapper {
    static toDomain(entity: IGroupMongoModel): IGroup {
        const { _id } = entity
        const map: Partial<IGroupMongoModel> = { ...entity }

        return {
            id: _id,
            ...map,
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
