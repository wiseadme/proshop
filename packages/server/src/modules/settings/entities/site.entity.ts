import { ISite } from '@proshop-app/types'

export class Site implements ISite {
    readonly id: string
    readonly colors: ISite['colors']
    readonly components: ISite['components']
    readonly logo: ISite['logo']
    readonly assets: ISite['assets']

    constructor({
        id = '',
        colors = {},
        components = {},
        logo = {},
        assets = []
    }) {
        this.id = id
        this.colors = colors
        this.components = components
        this.logo = logo
        this.assets = assets
    }

    static create(siteConfig = {}) {
        return new Site(siteConfig)
    }
}
