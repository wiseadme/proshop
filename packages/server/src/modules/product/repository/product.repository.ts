import mongoose, { Document, Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '../types/repository'
import { IProduct } from '@ecommerce-platform/types'
import { ProductQuery } from '../types/params'
import { ILogger } from '@/types/utils'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create(product: IProduct){
    return await (await new ProductModel({
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
      seo: product.seo,
      conditions: product.conditions
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
      ]) as Document & IProduct
  }

  async read(params: ProductQuery){
    let search

    const {
      page = DEFAULT_PAGE,
      count = DEFAULT_ITEMS_COUNT
    } = params as ProductQuery

    if (params._id) {
      params._id && validateId(params._id)

      const product = await ProductModel.find({ _id: params._id })
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

      return product
    }

    if (params.category) {
      search = { categories: { $in: params.category } }
    }

    if (params.url) {
      search = { url: params.url }
    }

    if (params.name) {
      search = { 'name': { '$regex': `.*${ params.name }*.`, '$options': 'i' } }
    }

    const products = await ProductModel
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
      .limit(count) as any

    return products
  }

  async update($set: Partial<IProduct>){
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
      ]) as Document & IProduct

    return { updated }
  }

  async delete(id){
    validateId(id)

    return !!await ProductModel.findOneAndDelete({ _id: id })
  }
}
