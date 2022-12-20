import { ICategory, ICategoryConditions } from '@ecommerce-platform/types'

export class CategoryDTO {
  url: string
  title: string
  order?: number
  image?: string
  parent?: string
  children?: string[]
  seo?: ICategory['seo']
  conditions: ICategoryConditions
}
