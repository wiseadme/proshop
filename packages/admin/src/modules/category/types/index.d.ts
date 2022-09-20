type CategorySeo = {
  title?: Maybe<string>
  description?: Maybe<string>
  keywords?: Maybe<string>
}

declare interface ICategory {
  _id: string
  title: string
  url: string
  image: Maybe<string>
  parent: Maybe<string | ICategory>
  children: Maybe<Array<ICategory>>
  order: number
  seo: CategorySeo
  isVisible: boolean
}

declare interface ICategoryUpdates {
  _id: string
  title?: string
  url?: string
  image?: Maybe<string>
  parent?: ICategory['_id']
  children?: Array<string>
  order?: number
  seo?: CategorySeo
}

declare interface ICategoryState {
  categories: Maybe<Array<ICategory>>
  category: Maybe<ICategory>
}

declare interface ICategoryActions {
  create(category: ICategory): Promise<ICategory>

  update(updates: Partial<ICategoryUpdates>): Promise<ICategory>

  read(id?: string): Promise<Array<ICategory>>

  delete(category: ICategory): Promise<boolean>
}

declare interface ICategoryService {
  createCategory(category: ICategory): void

  // updateParent: (category: ICategory) => Promise<ICategory> | undefined
}
