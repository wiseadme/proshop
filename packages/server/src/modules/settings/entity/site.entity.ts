export class Site {
    private _colors: any

    constructor({
        colors = {}
    }) {
        this._colors = colors
    }

    get colors() {
        return this._colors
    }

    static create(siteConfig = {}) {
        return new Site(siteConfig)
    }
}
