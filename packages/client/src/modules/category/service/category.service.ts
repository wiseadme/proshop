import { Store } from 'pinia'
import { useCategoryStore } from '@modules/category/store'
import { Observer } from '@shared/plugins/observer'

class Service extends Observer implements ICategoryService {
  private _store: Store<string, ICategoryState, {}, ICategoryActions>
  private _category: Maybe<ICategory>
  static instance: Service

  constructor(store){
    super()
    this._store = store
    this._category = null
  }

  get categories(){
    return this._store.categories
  }

  get category(){
    return this._category
  }

  setAsCurrent(category: Maybe<ICategory>){
    this._category = category
  }

  createCategory(model){
    return this._store.create(model)
      .then(() => this.getCategories())
  }

  getCategories(){
    return this._store.read().catch(err => console.log(err))
  }

  onGetCategories(){
    if (this.categories) return this.categories
    return this.getCategories()
  }

  updateCategory(updates){
    return this._store.update(updates)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  deleteCategory(category){
    this._store.delete(category)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  async uploadCategoryImage(files){
    if (!files.length) return

    const { formData, fileName } = await this.emit('create:data', files)
    const ownerId = this._category!._id

    const asset = await this.emit(
      'upload:file',
      { ownerId, fileName, formData }
    )

    if (asset && asset.url) {
      await this.updateCategory({ _id: this._category!._id, image: asset.url })
    }

    return asset.url
  }

  async deleteImageHandler(url){
    const ownerId = this._category!._id

    await this.emit('delete:file', { ownerId, url })
    return this.updateCategory({ _id: ownerId, image: null })
  }

  static create(){
    if (Service.instance) return Service.instance
    Service.instance = new Service(useCategoryStore())
    return Service.instance
  }
}

export const useCategoryService = () => Service.create()
