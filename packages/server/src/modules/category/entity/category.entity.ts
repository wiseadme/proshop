import { ICategory } from '@proshop/types'
import { translator } from '@common/utils/translator'

export class Category implements ICategory {
    readonly id: ICategory['id']
    readonly url: ICategory['url']
    readonly title: ICategory['title']
    readonly order: ICategory['order']
    readonly image: ICategory['image']
    readonly parent: ICategory['parent']
    readonly children: ICategory['children']
    readonly seo?: ICategory['seo']
    readonly conditions: ICategory['conditions']
    readonly length: ICategory['length']

    constructor({
        id = '',
        title,
        url,
        order = 0,
        length = 0,
        image = null,
        parent = null,
        children = null,
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
    }: ICategory) {
        this.id = id
        this.title = title
        this.order = order
        this.image = image
        this.parent = parent
        this.children = children
        this.conditions = conditions
        this.seo = seo
        this.url = url || translator(this.title).toLowerCase()
        this.length = length
    }

    static create(category: ICategory) {
        return new Category(category as ICategory)
    }

    static update(updates) {
        if (updates.title && !updates.url) updates.url = translator(updates.title)

        return updates
    }
}
