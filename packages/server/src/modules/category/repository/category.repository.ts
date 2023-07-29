import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ICategory, ICategoryMongoModel } from '@proshop/types'
import { ICategoryRepository } from '../types/repository'
import { ILogger } from '@/types/utils'

import { CategoryMapper } from '@modules/category/mappers/category.mapper'

@injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
    }

    async create(category: ICategory) {
        const created = await new CategoryModel({
            ...CategoryMapper.toMongoModelData(category),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        await Promise.all([
            created.populate('parent'),
            created.populate('children'),
        ])

        return CategoryMapper.toDomain(created.toObject())
    }

    async read(params: Partial<ICategory>): Promise<ICategory[]> {
        params.id && validateId(params.id)

        const categories = await CategoryModel
            .find(params.id ? { _id: params.id } : params)
            .lean()
            .populate('parent', ['_id', 'title', 'url', 'children'])
            .populate('children', ['_id', 'title', 'url', 'children'])

        return categories.map(ctg => CategoryMapper.toDomain(ctg))
    }

    async update(updates: Partial<ICategory>) {
        validateId(updates.id)

        const children = updates.children?.map(ctg => ctg.id) || null

        const updated = await CategoryModel.findByIdAndUpdate(
            { _id: updates.id },
            {
                $set: {
                    ...updates,
                    ...(children ? { children } : {}),
                },
            },
            { new: true },
        )
            .lean()
            .populate('parent', ['_id', 'title', 'url'])
            .populate('children', ['_id', 'title', 'url']) as ICategoryMongoModel

        return { updated: CategoryMapper.toDomain(updated) }
    }

    async delete(id) {
        validateId(id)

        return !!await CategoryModel.findByIdAndDelete(id)
    }
}
