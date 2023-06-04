import { translator } from '@common/utils/translator'
import { IProduct } from '@proshop/types'

export class Product implements IProduct {
    private readonly __id: string
    private readonly _name: IProduct['name']
    private readonly _price: IProduct['price']
    private readonly _quantity: IProduct['quantity']
    private readonly _unit: IProduct['unit']
    private readonly _description: IProduct['description']
    private readonly _image: IProduct['image']
    private readonly _url: IProduct['url']
    private readonly _categories: IProduct['categories']
    private readonly _seo: IProduct['seo']
    private readonly _assets: IProduct['assets']
    private readonly _variants: IProduct['variants']
    private readonly _attributes: IProduct['attributes']
    private readonly _conditions: IProduct['conditions']
    private readonly _related: IProduct['related']
    private readonly _currency: IProduct['currency']

    constructor({
        _id = '',
        name,
        price,
        description,
        image = '',
        assets,
        seo,
        quantity,
        unit,
        url,
        variants,
        categories,
        attributes,
        conditions,
        related,
        currency = null
    }: IProduct) {
        this.__id = _id
        this._name = name
        this._price = price
        this._quantity = quantity
        this._unit = unit
        this._description = description
        this._image = image
        this._url = url || translator(name).toLowerCase()
        this._seo = seo
        this._assets = assets
        this._variants = variants
        this._categories = categories
        this._attributes = attributes
        this._conditions = conditions
        this._related = related
        this._currency = currency
    }

    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    get currency() {
        return this._currency
    }

    get quantity() {
        return this._quantity
    }

    get unit() {
        return this._unit
    }

    get description() {
        return this._description
    }

    get categories() {
        return this._categories
    }

    get variants() {
        return this._variants
    }

    get image() {
        return this._image
    }

    get assets() {
        return this._assets
    }

    get seo() {
        return this._seo
    }

    get attributes() {
        return this._attributes
    }

    get url() {
        return this._url
    }

    get conditions() {
        return this._conditions
    }

    get related() {
        return this._related
    }

    static create(product): IProduct {
        return new Product(product)
    }

    static update(updates) {
        if (updates.name) updates.url = translator(updates.name)

        return updates
    }
}
