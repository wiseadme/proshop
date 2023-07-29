import { IOption, IOptionMongoModel } from '@proshop/types'
import { AssetMapper } from '@modules/asset/mappers/asset.mapper'

export class OptionMapper {
    static toDomain(entity: IOptionMongoModel): IOption {
        const { _id } = entity
        const map: Partial<IOptionMongoModel> = entity

        map.assets = map.assets?.map(asset => AssetMapper.toDomain(asset))

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
