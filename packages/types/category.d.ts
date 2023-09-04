import { ISEOType } from './common'
import { Maybe } from './utils'

export interface ICategoryConditions {
    visible: boolean
    special: boolean
}

export interface ICategory {
    id: string
    title: string
    image: Maybe<string>
    seo?: ISEOType
    url: string
    parentId: Maybe<string>
    order?: number
    length: number
    conditions: ICategoryConditions
}

export interface ICategoryMongoModel extends Omit<ICategory, 'id' | 'parent'>{
    _id: string
}
