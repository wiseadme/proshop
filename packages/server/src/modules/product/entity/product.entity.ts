import { translator } from '@common/utils/translator'
import { IProduct } from '@proshop/types'

export class Product implements IProduct {
    readonly id: string
    readonly name: IProduct['name']
    readonly price: IProduct['price']
    readonly quantity: IProduct['quantity']
    readonly unit: IProduct['unit']
    readonly description: IProduct['description']
    readonly image: IProduct['image']
    readonly url: IProduct['url']
    readonly categories: IProduct['categories']
    readonly seo: IProduct['seo']
    readonly assets: IProduct['assets']
    readonly variants: IProduct['variants']
    readonly attributes: IProduct['attributes']
    readonly conditions: IProduct['conditions']
    readonly related: IProduct['related']
    readonly currency: IProduct['currency']

    constructor({
        id = '',
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
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.unit = unit
        this.description = description
        this.image = image
        this.url = url || translator(name.toLowerCase())
        this.seo = seo
        this.assets = assets
        this.variants = variants
        this.categories = categories
        this.attributes = attributes
        this.conditions = conditions
        this.related = related
        this.currency = currency
    }

    static create(product: IProduct): IProduct {
        return new Product(product)
    }

    static update(updates) {
        if (updates.name) updates.url = translator(updates.name)

        return updates
    }
}
