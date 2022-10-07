import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/product/entity/product.entity'

// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IProductRepository } from '../types/repository'
import { IProductService } from '../types/service'
import { IProduct } from '../types/model'
import { IEventBusService } from '@/types/services'

// Constants
import {
  UPDATE_CATEGORY_EVENT,
  UPDATE_ASSETS_EVENT,
  DELETE_PRODUCT_EVENT
} from '@common/constants/events'

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IProductRepository) private repository: IProductRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
  }

  async create(product: IProduct){
    if (product.categories) {
      for (const category of product.categories) {
        await this.events.emit(
          UPDATE_CATEGORY_EVENT,
          { _id: category._id, length: category.length + 1 },
          true
        )
      }
    }

    return await this.repository.create(Product.create(product))
  }

  async read(query){
    const { id, category, name, page, count } = query
    const searchKey = name ? 'name' : category ? 'category' : null

    const params = id ? id : { page, count, [searchKey!]: query[searchKey!] }

    return await this.repository.read(params)
  }

  async update(updates: Partial<Document & IProduct>){

    if (updates.assets) {
      updates.assets.forEach(it => this.events.emit(UPDATE_ASSETS_EVENT, it))
      updates.image = updates.assets?.find(it => it.main)?.url || ''
    }

    if (updates.categories) {
      const [ product ] = await this.repository.read(updates._id)

      for (const category of product.categories) {
        await this.events.emit(
          UPDATE_CATEGORY_EVENT,
          { _id: category._id, length: category.length - 1 },
          true
        )
      }

      for (const category of updates.categories) {
        await this.events.emit(UPDATE_CATEGORY_EVENT, {
          _id: category._id,
          length: category.length + 1
        })
      }
    }

    return await this.repository.update(Product.update(updates))
  }

  async delete(id){
    const [ product ] = await this.repository.read(id)

    for (const category of product.categories) {
      await this.events.emit(UPDATE_CATEGORY_EVENT, {
        _id: category._id,
        length: category.length - 1
      })
    }

    const res = await this.repository.delete(id)

    await this.events.emit(DELETE_PRODUCT_EVENT, id)

    return res
  }
}
