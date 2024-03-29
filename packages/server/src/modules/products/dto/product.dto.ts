import { IProduct } from '@proshop/types'

export class ProductDTO {
    id: IProduct['id']
    name: IProduct['name']
    price: IProduct['price']
    quantity: IProduct['quantity']
    unit: IProduct['unit']
    description: IProduct['description']
    image: IProduct['image']
    url: IProduct['url']
    categories: IProduct['categories']
    seo: IProduct['seo']
    assets: IProduct['assets']
    variants: IProduct['variants']
    attributes: IProduct['attributes']
    conditions: IProduct['conditions']
}
