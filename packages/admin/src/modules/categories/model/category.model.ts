import { ICategory } from '@proshop/types'

export class Category implements ICategory {
    id: ICategory['id']
    title: ICategory['title']
    url: ICategory['url']
    image: ICategory['image']
    assets: ICategory['assets']
    parentId: ICategory['parentId']
    order: ICategory['order']
    seo: ICategory['seo']
    length: ICategory['length']
    conditions: ICategory['conditions']

    constructor({
        id = '',
        title = '',
        url = '',
        image = null,
        assets = [],
        parentId = null,
        order = 0,
        length = 0,
        conditions = {
            visible: true,
            special: false,
        },
        seo = {
            title: null,
            description: null,
            keywords: null,
            metatags: [],
            schema: [],
        },
    } = {}) {
        this.id = id
        this.title = title
        this.url = url
        this.image = image
        this.assets = assets
        this.parentId = parentId
        this.order = order
        this.seo = seo
        this.length = length
        this.conditions = conditions
    }

    static create(category = {}) {
        return new Category(category)
    }
}
