export class Category implements ICategory {
  _id: ICategory['_id']
  title: ICategory['title']
  url: ICategory['url']
  image: ICategory['image']
  parent: ICategory['parent']
  children: ICategory['children']
  order: ICategory['order']
  seo: ICategory['seo']
  isVisible: ICategory['isVisible']

  constructor({
    _id = '',
    title = '',
    url = '',
    image = null,
    parent = null,
    children = null,
    isVisible = true,
    order = 0,
    seo = {
      title: null,
      description: null,
      keywords: null
    }
  }){
    this._id = _id
    this.title = title
    this.url = url
    this.image = image
    this.parent = parent
    this.children = children
    this.order = order
    this.seo = seo
    this.isVisible = isVisible
  }

  static create(category = {}){
    return new Category(category)
  }
}
