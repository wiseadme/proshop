import { ICategory } from '@ecommerce-platform/types'
import { translator } from '@common/utils/translator'

export class Category implements ICategory {

  private readonly _url: ICategory['url']
  private readonly _title: ICategory['title']
  private readonly _order: ICategory['order']
  private readonly _image: ICategory['image']
  private readonly _parent: ICategory['parent']
  private readonly _children?: ICategory['children']
  private readonly _seo?: ICategory['seo']
  private readonly _isVisible: ICategory['isVisible']
  private readonly _length: ICategory['length']

  constructor({
    title,
    url,
    order = 0,
    image = null,
    parent = null,
    children,
    isVisible,
    seo = {
      title: null,
      description: null,
      keywords: null
    }
  }: ICategory){
    this._title = title
    this._order = order
    this._image = image
    this._parent = parent
    this._children = children
    this._isVisible = isVisible
    this._seo = seo
    this._url = url || translator(this._title).toLowerCase()
    this._length = 0
  }

  get title(){
    return this._title
  }

  get order(){
    return this._order
  }

  get url(): string{
    return this._url
  }

  get seo(){
    return this._seo
  }

  get image(){
    return this._image
  }

  get parent(){
    return this._parent
  }

  get children(){
    return this._children
  }

  get isVisible(){
    return this._isVisible
  }

  get length(){
    return this._length
  }

  static create(category: ICategory){
    return new Category(category as ICategory)
  }

  static update(updates){
    if (updates.title && !updates.url) updates.url = translator(updates.title)
    return updates
  }
}
