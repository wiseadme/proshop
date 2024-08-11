import type { IProduct } from '@proshop-app/types'

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
    groups: IProduct['groups']
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
        groups = [],
        currency = null,
        url = '',
        sku = '',
        related = [],
        conditions = {
            isVisible: true,
            isCountable: false,
            isExists: true,
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
        this.groups = groups
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
