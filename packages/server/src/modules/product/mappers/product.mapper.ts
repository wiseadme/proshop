import { IProduct, IProductMongoModel, IVariant } from '@proshop/types'
import { CategoryMapper } from '@modules/category/mappers/category.mapper'
import { AssetMapper } from '@modules/asset/mappers/asset.mapper'
import { VariantMapper } from '@modules/variant/mappers/variant.mapper'
import { AttributeMapper } from '@modules/attribute/mappers/attribute.mapper'

export class ProductMapper {
    static toDomain(entity: IProductMongoModel): IProduct {
        const { _id } = entity
        const map: Partial<IProductMongoModel> = { ...entity }

        map.related = map.related?.map(pr => ProductMapper.toDomain(pr)) || entity.related
        map.categories = map.categories?.map(ctg => CategoryMapper.toDomain(ctg))
        map.assets = map.assets?.map(asset => AssetMapper.toDomain(asset))
        map.variants = map.variants?.map(variant => VariantMapper.toDomain(variant))

        delete map._id

        return {
            id: _id,
            ...map,
        } as IProduct
    }

    static toMongoModelData(domainModel: Partial<IProduct>): IProductMongoModel {
        const map = domainModel
        const { id } = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
            assets: map.assets?.map(asset => asset.id) || [],
            variants: map.variants?.map(variant => VariantMapper.toMongoModelData(variant))
        } as IProductMongoModel
    }
}
