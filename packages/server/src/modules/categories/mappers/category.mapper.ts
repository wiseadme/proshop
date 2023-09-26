import { IAssetMongoModel, ICategory, ICategoryMongoModel } from '@proshop/types'
import { AssetMapper } from '@modules/asset/mappers/asset.mapper'

export class CategoryMapper {
    static toDomain(entity: ICategoryMongoModel): ICategory {
        const { _id } = entity
        const map: Partial<ICategoryMongoModel> = { ...entity }

        map.assets = map.assets?.map(it => AssetMapper.toDomain(it as any))

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
