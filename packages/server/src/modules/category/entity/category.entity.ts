import { ICategory } from '@ecommerce-platform/types'
import { translator } from '@common/utils/translator'

export class Category implements ICategory {
    private readonly __id: ICategory['_id']
    private readonly _url: ICategory['url']
    private readonly _title: ICategory['title']
    private readonly _order: ICategory['order']
    private readonly _image: ICategory['image']
    private readonly _parent: ICategory['parent']
    private readonly _children?: ICategory['children']
    private readonly _seo?: ICategory['seo']
    private readonly _conditions: ICategory['conditions']
    private readonly _length: ICategory['length']

    constructor({
        _id = '',
        title,
        url,
        order = 0,
        image = null,
        parent = null,
        children,
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
        this.__id = _id
        this._title = title
        this._order = order
        this._image = image
        this._parent = parent
        this._children = children
        this._conditions = conditions
        this._seo = seo
        this._url = url || translator(this._title).toLowerCase()
        this._length = 0
    }

    get _id() {
        return this.__id
    }

    get title() {
        return this._title
    }

    get order() {
        return this._order
    }

    get url(): string {
        return this._url
    }

    get seo() {
        return this._seo
    }

    get image() {
        return this._image
    }

    get parent() {
        return this._parent
    }

    get children() {
        return this._children
    }

    get conditions() {
        return this._conditions
    }

    get length() {
        return this._length
    }

    static create(category: ICategory) {
        return new Category(category as ICategory)
    }

    static update(updates) {
        if (updates.title && !updates.url) updates.url = translator(updates.title)
        return updates
    }
}
