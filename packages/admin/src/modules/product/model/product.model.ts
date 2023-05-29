import { IProduct } from '@proshop/types'

export class Product implements IProduct {
  _id: IProduct['_id']
  name: IProduct['name']
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
  seo: IProduct['seo']
  url: IProduct['url']
  related: IProduct['related']

  constructor({
      _id = '',
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
      url = '',
      related = [],
      conditions = {
          visible: true,
          countable: false,
          exists: true,
          hasDiscounts: false,
          hasActions: false
      },
      seo = {
          title: '',
          description: '',
          keywords: '',
          metatags: [],
          schema: []
      }
  }: IProduct){
      this._id = _id
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
      this.related = related
      this.seo = seo
      this.url = url
  }

  static create(product = {} as IProduct){
      return new Product(product) as IProduct
  }
}
