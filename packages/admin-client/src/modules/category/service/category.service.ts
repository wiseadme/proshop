import { Store } from 'nervue'
import { useCategoryStore } from '@modules/category/store'
import { useFilesService } from '@shared/services/files.service'

class Service implements ICategoryService {
  private _store: Store<string, ICategoryState, {}, {}, ICategoryActions>
  private _category: Maybe<ICategory>
  private _files: ReturnType<typeof useFilesService>
  static instance: Service

  constructor({ store, filesService }) {
    this._store = store
    this._files = filesService
    this._category = null
  }

  get categories() {
    return this._store.categories
  }

  get category() {
    return this._category
  }

  setAsCurrent(category: Maybe<ICategory>) {
    this._category = category
  }

  createCategory(model) {
    return this._store.create(model)
      .then(() => this.getCategories())
  }

  getCategories() {
    return this._store.read()
  }

  updateCategory(updates) {
    return this._store.update(updates)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  deleteCategory(category) {
    this._store.delete(category)
      .then(() => this.getCategories())
      .catch(err => console.log(err))
  }

  async uploadCategoryImage(files) {
    if (!files.length) return

    const { formData, fileName } = this._files.createFormData(files)
    const ownerId = this._category!._id

    const asset = await this._files.uploadFile({ ownerId, fileName, formData })

    if (asset && asset.url) {
      await this.updateCategory({ _id: this._category!._id, image: asset.url })
    }

    return asset.url
  }

  async deleteImageHandler(url) {
    const ownerId = this._category!._id

    await this._files.deleteFile({ ownerId, url })
    return this.updateCategory({ _id: ownerId, image: null })
  }

  static create() {
    if (Service.instance) return Service.instance

    Service.instance = new Service({
      store: useCategoryStore(),
      filesService: useFilesService()
    })

    return Service.instance
  }
}

export const useCategoryService = () => Service.create()
