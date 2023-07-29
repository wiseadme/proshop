import { ICategory, ICategoryMongoModel } from '@proshop/types'

export class CategoryMapper {
    static toDomain(entity: ICategoryMongoModel): ICategory {
        const { _id } = entity
        const map: Partial<ICategoryMongoModel> = entity

        const children = map.children?.map(ch => ch ? CategoryMapper.toDomain(ch) : ch) || null
        const parent = map.parent ? CategoryMapper.toDomain(map.parent as ICategoryMongoModel) : map.parent

        delete map._id

        return {
            id: _id,
            ...map,
            ...(children ? { children } : {}),
            ...(parent ? { parent } : {}),
        } as ICategory

    }

    static toMongoModelData(domainModel: ICategory): ICategoryMongoModel {
        const { id } = domainModel
        const map: Partial<ICategory> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as ICategoryMongoModel
    }
}
