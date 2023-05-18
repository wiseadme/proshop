export class MetaTag {
    private _order: number
    private _props: Record<string, string>

    constructor({
        order,
        props,
    }) {
        this._order = order
        this._props = props
    }

    get order() {
        return this._order
    }

    get props() {
        return this._props
    }

    static create(metaTag) {
        return new MetaTag(metaTag)
    }
}
