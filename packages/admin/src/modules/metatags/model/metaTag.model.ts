import { IMetaTag } from '@proshop/types'

export class MetaTag {
    id: string
    props: Record<string, string>
    order: number

    constructor({ id = '', props = {}, order = 0 }: IMetaTag) {
        this.id = id
        this.props = props
        this.order = order
    }

    static create(metaTag = {} as IMetaTag) {
        return new MetaTag(metaTag)
    }
}
