import { ICategory } from '@ecommerce-platform/types'

export interface ICategoryState {
  categories: Maybe<Array<ICategory>>
  category: Maybe<ICategory>
}

export interface ICategoryActions {
  create(category: ICategory): Promise<ICategory>

  update(updates: Partial<ICategory>): Promise<ICategory>

  read(id?: string): Promise<Array<ICategory>>

  delete(category: ICategory): Promise<boolean>
}

export interface ICategoryService {
  createCategory(category: ICategory): void

  // updateParent: (category: ICategory) => Promise<ICategory> | undefined
}
