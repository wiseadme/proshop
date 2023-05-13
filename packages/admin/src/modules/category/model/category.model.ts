import { ICategory } from '@ecommerce-platform/types'

export class Category implements ICategory {
  _id: ICategory['_id']
  title: ICategory['title']
  url: ICategory['url']
  image: ICategory['image']
  parent: ICategory['parent']
  children: ICategory['children']
  order: ICategory['order']
  seo: ICategory['seo']
  length: ICategory['length']
  conditions: ICategory['conditions']

  constructor({
      _id = '',
      title = '',
      url = '',
      image = null,
      parent = null,
      children = null,
      order = 0,
      length = 0,
      conditions = {
          visible: true,
          special: false
      },
      seo = {
          title: null,
          description: null,
          keywords: null,
          metatags: [],
          schema: []
      }
  } = {}){
      this._id = _id
      this.title = title
      this.url = url
      this.image = image
      this.parent = parent
      this.children = children
      this.order = order
      this.seo = seo
      this.length = length
      this.conditions = conditions
  }

  static create(category = {}){
      return new Category(category)
  }
}
