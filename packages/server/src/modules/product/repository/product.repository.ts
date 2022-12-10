import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '../types/repository'
import { IProduct } from '../types/model'
import { ProductQuery } from '../types/params'
import { ILogger } from '@/types/utils'

import { translator } from '@common/utils/translator'

const DEFAULT_COUNT = 20
const DEFAULT_PAGE = 1

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create(product: IProduct){
    return (await new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      url: product.url,
      count: product.quantity,
      categories: product.categories,
      variants: product.variants,
      attributes: product.attributes,
      unit: product.unit,
      assets: product.assets,
      seo: product.seo
    })
      .save())
      .populate([
        'assets',
        {
          path: 'categories',
          select: 'title'
        },
        {
          path: 'variants',
          populate: {
            path: 'options',
            populate: {
              path: 'assets'
            }
          }
        }
      ])
  }

  async read(params: ProductQuery){
    let search

    const { category, page = DEFAULT_PAGE, count = DEFAULT_COUNT } = params as ProductQuery

    console.log(params)

    if (params._id) {
      params._id && validateId(params._id)

      return ProductModel.find({ _id: params._id })
        .populate('categories', [ 'title' ])
        .populate([
          'assets',
          {
            path: 'variants',
            populate: {
              path: 'options',
              populate: {
                path: 'assets'
              }
            }
          }
        ])
    }

    if (params.category) {
      search = { categories: { $in: category } }
    }

    if (params.url) {
      search = { url: params.url }
    }

    if (params.name) {
      search = { 'name': { '$regex': `.*${ params.name }*.`, '$options': 'i' } }
    }

    return ProductModel
      .find(search)
      .populate('categories', [ 'title' ])
      .populate([
        'assets',
        {
          path: 'variants',
          populate: {
            path: 'options',
            populate: {
              path: 'assets'
            }
          }
        }
      ])
      .skip((page * count) - count)
      .limit(count)
  }

  async update($set: Partial<Document<IProduct>>){
    validateId($set._id)

    const updated = await ProductModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    )
      .populate('categories', [ 'title' ])
      .populate([
        'assets',
        {
          path: 'variants',
          populate: {
            path: 'options',
            populate: {
              path: 'assets'
            }
          }
        }
      ]) as Document<IProduct>

    return { updated }
  }

  async delete(id){
    validateId(id)

    return !!await ProductModel.findOneAndDelete({ _id: id })
  }
}
