import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ICategory, ICategoryMongoModel } from '@proshop/types'
import { ICategoryRepository } from '../types/repository'
import { ILogger } from '@/types/utils'
// Mappers
import { CategoryMapper } from '@modules/categories/mappers/category.mapper'

@injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
    }

    async createCategory(category: ICategory) {
        const created = await new CategoryModel({
            ...CategoryMapper.toMongoModelData(category),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        await created.populate('assets')

        return CategoryMapper.toDomain(created.toObject())
    }

    async getCategories(params: Partial<ICategory>): Promise<ICategory[]> {
        params.id && validateId(params.id)

        const categories = await CategoryModel
            .find(params.id ? { _id: params.id } : params)
            .populate('assets')
            .lean()

        return categories.map(ctg => CategoryMapper.toDomain(ctg))
    }

    async updateCategory(updates: Partial<ICategory>) {
        const { id } = updates
        validateId(updates.id)

        delete updates.id

        const updated = await CategoryModel.findByIdAndUpdate(
            { _id: id },
            { $set: updates },
            { new: true },
        )
            .populate('assets')
            .lean() as ICategoryMongoModel

        return CategoryMapper.toDomain(updated)
    }

    async deleteCategory(id) {
        validateId(id)

        return !!await CategoryModel.findByIdAndDelete(id)
    }
}
