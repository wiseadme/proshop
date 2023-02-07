import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { ProductModel } from '@modules/product/model/product.model'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ICategory } from '@ecommerce-platform/types'
import { ICategoryRepository } from '../types/repository'
import { ILogger } from '@/types/utils'

type ReadParams = Partial<ICategory>
type UpdateParams = Partial<ICategory>

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create(category: ICategory){
    const created = await new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      title: category.title,
      url: category.url,
      order: category.order,
      seo: category.seo,
      image: category.image,
      parent: category.parent || null,
      children: category.children || [],
      length: category.length,
      conditions: category.conditions
    }).save()

    await Promise.all([
      created.populate('parent'),
      created.populate('children')
    ])

    return created
  }

  async read(params: Partial<ICategory>): Promise<Array<Document & ICategory>>{
    params._id && validateId(params._id)

    const categories = await CategoryModel
      .find(params)
      .populate('parent', [ 'title', 'url', 'children' ])
      .populate('children', [ 'title', 'url', 'children' ])

    return categories as Array<Document & ICategory>
  }

  async update(updates: UpdateParams){
    validateId(updates._id)

    let updated

    if (updates.length) {
      updated = CategoryModel.findByIdAndUpdate(
        { _id: updates._id },
        { $set: { length: await ProductModel.countDocuments({ categories: { $in: updates._id } }) } },
        { new: true }
      )
    } else {
      updated = CategoryModel.findByIdAndUpdate(
        { _id: updates._id },
        { $set: updates },
        { new: true }
      )
    }

    updated = await updated
      .populate('parent', [ 'title', 'url' ])
      .populate('children', [ 'title', 'url' ]) as Document & ICategory

    return { updated }
  }

  async delete(id){
    validateId(id)

    return !!await CategoryModel.findByIdAndDelete(id)
  }
}
