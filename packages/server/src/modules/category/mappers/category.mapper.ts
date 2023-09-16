import { ICategory, ICategoryMongoModel } from '@proshop/types'

export class CategoryMapper {
    static toDomain(entity: ICategoryMongoModel): ICategory {
        const { _id } = entity
        const map: Partial<ICategoryMongoModel> = { ...entity }

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
