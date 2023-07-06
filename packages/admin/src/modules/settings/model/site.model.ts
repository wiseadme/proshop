import { ISite } from '@proshop/types'

export class Site implements ISite {
    public _id: ISite['_id']
    public colors: ISite['colors']
    public layout: ISite['layout']
    public components: ISite['components']
    constructor({
        _id,
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
        this._id = _id
        this.colors = colors
        this.layout = layout
        this.components = components
    }

    static create(siteConfig = {} as ISite) {
        return new Site(siteConfig)
    }
}
