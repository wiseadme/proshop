import { ICategory, ICategoryConditions } from '@proshop/types'

export class CategoryDTO {
    url: string
    title: string
    order?: number
    image?: string
    parentId?: string
    seo?: ICategory['seo']
    conditions: ICategoryConditions
}
