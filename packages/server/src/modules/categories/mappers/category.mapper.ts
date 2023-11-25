import { IAssetMongoModel, ICategory, ICategoryMongoModel } from '@proshop/types'
import { AssetMapper } from '@modules/asset/mappers/asset.mapper'
import { FilterGroupMapper } from '@modules/filter/mappers/filterGroup.mapper'

export class CategoryMapper {
    static toDomain(entity: ICategoryMongoModel): ICategory {
        const { _id } = entity
        const map: Partial<ICategoryMongoModel> = { ...entity }

        map.assets = map.assets?.map(it => AssetMapper.toDomain(it as any))
        map.filters = map.filters?.map(it => FilterGroupMapper.toDomain(it as any))

        delete map._id

        return {
            id: _id,
            ...map,
        } as ICategory
    }

    static toMongoModelData(domainModel: ICategory): ICategoryMongoModel {
        const { id } = domainModel
        const map: Partial<ICategory> = { ...domainModel }

        delete map.id

        return {
            _id: id,
            ...map,
        } as ICategoryMongoModel
    }
}
