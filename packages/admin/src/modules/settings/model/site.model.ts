import type { ISite } from '@proshop-app/types'

export class Site implements ISite {
    public id: ISite['id']
    public colors: ISite['colors']
    public layout: ISite['layout']
    public components: ISite['components']
    constructor({
        id,
        colors = {
            primary: '',
            secondary: '',
            success: '',
            warning: '',
            disabled: '',
            error: '',
            content: '',
            base: ''
        },
        layout,
        components,
    }: ISite) {
        this.id = id
        this.colors = colors
        this.layout = layout
        this.components = components
    }

    static create(siteConfig = {} as ISite) {
        return new Site(siteConfig)
    }
}
