import { IProduct } from '@proshop/types'

export class Product implements IProduct {
    id: IProduct['id']
    name: IProduct['name']
    sku: IProduct['sku']
    price: IProduct['price']
    quantity: IProduct['quantity']
    unit: IProduct['unit']
    conditions: IProduct['conditions']
    categories: IProduct['categories']
    description: IProduct['description']
    image: IProduct['image']
    assets: IProduct['assets']
    attributes: IProduct['attributes']
    variants: IProduct['variants']
    currency: IProduct['currency']
    seo: IProduct['seo']
    url: IProduct['url']
    related: IProduct['related']

    constructor({
        id = '',
        name = '',
        price = 0,
        quantity = 0,
        unit = null,
        categories = [],
        description = '',
        image = null,
        assets = [],
        attributes = [],
        variants = [],
        currency = null,
        url = '',
        sku = '',
        related = [],
        conditions = {
            visible: true,
            countable: false,
            exists: true,
            hasDiscounts: false,
            hasActions: false,
        },
        seo = {
            title: '',
            description: '',
            keywords: '',
            metatags: [],
            schema: [],
        },
    }: IProduct) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.unit = unit
        this.image = image
        this.assets = assets
        this.categories = categories
        this.description = description
        this.attributes = attributes
        this.variants = variants
        this.conditions = conditions
        this.currency = currency
        this.related = related
        this.seo = seo
        this.url = url
        this.sku = sku
    }

    static create(product = {} as IProduct) {
        return new Product(product) as IProduct
    }
}
