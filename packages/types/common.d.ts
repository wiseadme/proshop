import { Maybe } from './utils'
import { IMetaTag } from './metatag'

export interface ISEOType {
    title: Maybe<string>
    description: Maybe<string>
    keywords: Maybe<string>
    metatags: Array<IMetaTag>
    schema: Array<any>
}
