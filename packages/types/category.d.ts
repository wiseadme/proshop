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
    parent: Maybe<string | ICategory>
    order?: number
    children: Maybe<string[] | ICategory[]>
    length: number
    conditions: ICategoryConditions
}

export interface ICategoryMongoModel extends Omit<ICategory, 'id' | 'children' | 'parent'>{
    _id: string
    children: Maybe<string[] | ICategoryMongoModel[]>
    parent: Maybe<string | ICategoryMongoModel>
}
