import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '@common/schemes/di-types'

// Types
import { ICategory } from '@ecommerce-platform/types'
import { ICategoryService } from '../types/service'
import { ICategoryRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'
import { ILogger } from '@/types/utils'

// Constants
import {
  DELETE_CATEGORY_EVENT,
  UPDATE_CATEGORY_EVENT
} from '@common/constants/events'

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ICategoryRepository) private repository: ICategoryRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
    this.addListeners()
  }

  async create(category: ICategory){
    const ctg = await this.repository.create(Category.create(category))

    if (category.parent) {
      const [ parent ] = await this.repository.read({ id: category.parent } as Partial<ICategory>)
      const children = [ ...parent!.children!, ctg._id ]

      const $set = { _id: parent._id, children }

      await this.repository.update($set)
    }

    return ctg
  }

  async update(update: Partial<Document & ICategory>): Promise<{ updated: Document<ICategory> }>{
    const [ category ] = await this.repository.read({ _id: update._id })

    if (update.parent) {
      if (category.parent) {
        const [ prevParent ] = await this.repository.read({ _id: category.parent } as Partial<ICategory>)

        const children = prevParent!.children!.filter((it) => {
          return (it as any)._id.toString() !== update._id
        })

        const $set = { _id: prevParent._id, children }

        await this.repository.update($set)
      }

      const [ currentParent ] = await this.repository.read({ _id: update.parent } as Partial<ICategory>)
      const $set = { children: [ ...currentParent!.children!, category!._id ], _id: currentParent._id }

      await this.repository.update($set)
    }

    return this.repository.update(update)
  }

  read(query: Partial<ICategory>){
    return this.repository.read(query)
  }

  async delete(id: string): Promise<boolean>{
    const [ category ] = await this.repository.read({ _id: id })
    const res = await this.repository.delete(id)

    if (category.parent) {
      const [ parent ] = await this.repository.read({ _id: category.parent } as Partial<ICategory>)

      // here we add the "any" type to
      // children, because they are populated
      const children = parent!.children!.filter((it) => {
        return (it as any)._id.toString() !== category._id
      })

      const $set = { _id: parent._id, children }

      await this.repository.update($set)
    }

    await this.events.emit(DELETE_CATEGORY_EVENT, id)

    return res
  }

  addListeners(){
    this.events.on(UPDATE_CATEGORY_EVENT, this.update.bind(this))
  }
}