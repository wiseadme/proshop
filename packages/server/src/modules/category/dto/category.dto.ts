import { ICategory } from '@modules/category/types/model'

export class CategoryDTO {
  url: string
  title: string
  order?: number
  image?: string
  parent?: string
  children?: string[]
  seo?: ICategory['seo']
  isVisible: boolean
}
