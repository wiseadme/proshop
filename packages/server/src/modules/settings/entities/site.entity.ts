import { ISite } from '@proshop-app/types'

export class Site implements ISite{
    readonly _id: string
    readonly _colors: ISite['colors']
    readonly _components: ISite['components']

    constructor({
        id = '',
        colors = {},
        components = {},
    }) {
        this._colors = colors
        this._components = components
    }

    get colors() {
        return this._colors
    }

    get components() {
        return this._components
    }

    static create(siteConfig = {}) {
        return new Site(siteConfig)
    }
}
