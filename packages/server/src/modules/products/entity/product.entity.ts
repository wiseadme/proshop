import { translator } from '@common/utils/translator'
import { IProduct, IProductParams } from '@proshop/types'
import { SkuGenerator } from '@common/plugins/sku-generator'
import customId from 'custom-id'

export class Product implements IProductParams {
    readonly id: string
    readonly name: IProductParams['name']
    readonly price: IProductParams['price']
    readonly quantity: IProductParams['quantity']
    readonly unit: IProductParams['unit']
    readonly description: IProductParams['description']
    readonly image: IProductParams['image']
    readonly url: IProductParams['url']
    readonly sku: IProductParams['sku']
    readonly categories: IProductParams['categories']
    readonly seo: IProductParams['seo']
    readonly assets: IProductParams['assets']
    readonly variants: IProductParams['variants']
    readonly attributes: IProductParams['attributes']
    readonly conditions: IProductParams['conditions']
    readonly related: IProductParams['related']
    readonly currency: IProductParams['currency']

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
        sku = '',
        currency = '',
    }: IProductParams) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.unit = unit
        this.description = description
        this.image = image
        this.url = url || translator(name.toLowerCase())
        this.sku = sku || SkuGenerator.generate({ url: this.url, id: customId({ name: this.url, randomLength: 5 }) })
        this.seo = seo
        this.assets = assets
        this.variants = variants
        this.categories = categories
        this.attributes = attributes
        this.conditions = conditions
        this.related = related
        this.currency = currency
    }

    static create(product: IProductParams): IProductParams {
        return new Product(product)
    }

    static update(updates) {
        if (updates.name) updates.url = translator(updates.name)

        return updates
    }
}
