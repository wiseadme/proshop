export class MetaTag {
    readonly id: string
    readonly order: number
    readonly props: Record<string, string>

    constructor({
        id = '',
        order,
        props,
    }) {
        this.id = id
        this.order = order
        this.props = props
    }

    static create(metaTag) {
        return new MetaTag(metaTag)
    }
}
