import { ICategory } from '@proshop/types'
import { translator } from '@common/utils/translator'

export class Category implements ICategory {
    readonly id: ICategory['id']
    readonly url: ICategory['url']
    readonly title: ICategory['title']
    readonly order: ICategory['order']
    readonly image: ICategory['image']
    readonly assets: ICategory['assets']
    readonly parentId: ICategory['parentId']
    readonly seo: ICategory['seo']
    readonly conditions: ICategory['conditions']
    readonly length: ICategory['length']
    readonly filters: ICategory['filters']

    constructor({
        id = '',
        title,
        url,
        order = 0,
        length = 0,
        image = null,
        assets = [],
        filters = [],
        parentId = null,
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
        }
    }: ICategory) {
        this.id = id
        this.title = title
        this.order = order
        this.image = image
        this.assets = assets
        this.parentId = parentId
        this.conditions = conditions
        this.filters = filters
        this.seo = seo
        this.url = url || translator(this.title).toLowerCase()
        this.length = length
    }

    static create(category: ICategory) {
        return new Category(category as ICategory)
    }

    static update(updates: Partial<ICategory>) {
        if (updates.title && !updates.url) {
            updates.url = translator(updates.title)
        }

        return updates
    }
}
