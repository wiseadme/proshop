export class Product implements IProduct {
  _id: IProduct['_id']
  name: IProduct['name']
  price: IProduct['price']
  count: IProduct['count']
  unit: IProduct['unit']
  isVisible: IProduct['isVisible']
  categories: IProduct['categories']
  description: IProduct['description']
  image: IProduct['image']
  assets: IProduct['assets']
  attributes: IProduct['attributes']
  variants: IProduct['variants']
  seo: IProduct['seo']
  url: IProduct['url']

  constructor({
    _id = '',
    name = '',
    price = 0,
    count = 0,
    unit = null,
    categories = [],
    description = '',
    image = null,
    assets = null,
    attributes = null,
    variants = null,
    isVisible = true,
    url = '',
    seo = {
      title: '',
      description: '',
      keywords: ''
    }
  }){
    this._id = _id
    this.name = name
    this.price = price
    this.count = count
    this.unit = unit
    this.image = image
    this.assets = assets
    this.categories = categories
    this.description = description
    this.attributes = attributes
    this.variants = variants
    this.isVisible = isVisible
    this.seo = seo
    this.url = url
  }

  static create(product = {}){
    return new Product(product)
  }
}
