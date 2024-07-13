import { IOption, IOptionMongoModel } from '@proshop/types'

export class OptionMapper {
    static toDomain(entity: IOptionMongoModel): IOption {
        const { _id } = entity
        const map: Partial<IOptionMongoModel> = { ...entity }

        delete map._id

        return {
            id: _id,
            ...map,
        } as IOption
    }

    static toMongoModelData(domainModel: IOption): IOptionMongoModel {
        const { id } = domainModel
        const map: Partial<IOption> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IOptionMongoModel
    }
}
