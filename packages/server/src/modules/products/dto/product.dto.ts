import { IProduct } from '@proshop-app/types'

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
    groups: IProduct['groups']
    attributes: IProduct['attributes']
    conditions: IProduct['conditions']
}
