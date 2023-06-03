import { ISEOType } from './common'
import { Maybe } from './utils'

export interface ICategoryConditions {
    visible: boolean
    special: boolean
}

export interface ICategory {
    _id: string
    title: string
    image: Maybe<string>
    seo?: ISEOType
    url: string
    parent: Maybe<string | ICategory>
    order?: number
    children?: Maybe<ICategory[] | string[]>
    length: number
    conditions: ICategoryConditions
}
