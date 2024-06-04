import { IProduct, IProductMongoModel, IProductParams } from '@proshop/types'
import { CategoryMapper } from '@modules/categories/mappers/category.mapper'
import { AssetMapper } from '@modules/asset/mappers/asset.mapper'
import {GroupMapper} from '@modules/group/mappers/group.mapper'

export class ProductMapper {
    static toDomain(entity: IProductMongoModel): IProduct {
        const { _id } = entity
        const map: Partial<IProductMongoModel> = { ...entity }

        map.related = map.related?.map(pr => ProductMapper.toDomain(pr)) || entity.related
        map.categories = map.categories?.map(ctg => CategoryMapper.toDomain(ctg))
        map.assets = map.assets?.map(asset => AssetMapper.toDomain(asset))
        map.variants = map.variants?.map(variant => GroupMapper.toDomain(variant))

        delete map._id

        return {
            id: _id,
            ...map,
        } as IProduct
    }

    static toMongoModelData(domainModel: Partial<IProductParams>): IProductMongoModel {
        const map = { ...domainModel }
        const { id } = map

        delete map.id

        return {
            _id: id,
            ...map,
            ...(map.variants ? { variants: map.variants?.map(variant => GroupMapper.toMongoModelData(variant)) } : {})
        } as IProductMongoModel
    }
}
