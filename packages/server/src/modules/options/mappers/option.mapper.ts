import { IOption, IOptionMongoModel } from '@proshop-app/types'

export class OptionMapper {
    static toDomain(entity: IOptionMongoModel): IOption {
        try {
            const { _id } = entity
            const map: Partial<IOptionMongoModel> = { ...entity }

            delete map._id

            return {
                id: _id,
                ...map,
            } as IOption
        } catch (err) {
            console.log('OptionMapper.toDomain error', err)

            return {} as IOption
        }
    }

    static toMongoModelData(domainModel: IOption): IOptionMongoModel {
        try {
            const { id } = domainModel
            const map: Partial<IOption> = domainModel

            delete map.id

            return {
                _id: id,
                ...map,
            } as IOptionMongoModel
        } catch (err) {
            console.log('OptionMapper.toMongoModelData error', err)

            return {} as IOptionMongoModel
        }
    }
}
