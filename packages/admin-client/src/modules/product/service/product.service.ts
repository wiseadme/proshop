import { Store } from 'pinia'
import { ref, Ref } from 'vue'
// Stores
import { useAppStore } from '@app/store'
import { useProductStore } from '@modules/product/store'
// Services
import { useFilesService } from '@shared/services/files.service'
// Types
import { IProductState, IProductActions, IProduct, IProductAsset } from '../types'

class Service {
  private _store: Store<string, IProductState, {}, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  private _appStore: Store<string, any, {}, any>
  private _files: ReturnType<typeof useFilesService>
  static instance: Service

  constructor({ store, appStore, filesService }){
    this._store = store
    this._appStore = appStore
    this._product = ref(null)
    this._files = filesService
  }

  get products(){
    return this._store.products
  }

  get product(){
    return this._product.value
  }

  get attributes(){
    return this._appStore.attributes
  }

  get categories(){
    return this._appStore.categories
  }

  get units(){
    return this._appStore.units
  }

  get variants(){
    return this._appStore.variants
  }

  async getAttributes(){
    if (this._appStore.attributes) return this._appStore.attributes
    await this._appStore.getAttributes()
  }

  async getUnits(){
    if (this._appStore.units) return this._appStore.units
    await this._appStore.getUnits()
  }

  async getCategories(){
    if (this._appStore.categories) return this._appStore.categories
    await this._appStore.getCategories()
  }

  async getVariants(){
    if (this._appStore.variants) return this._appStore.variants
    await this._appStore.getVariants()
  }

  getProducts(){
    return this._store.read().catch(err => console.log(err))
  }

  setAsCurrent(product: IProduct){
    this._product.value = product
  }

  createProduct(product: IProduct){
    return this._store.create(product)
      .catch(err => console.log(err))
  }

  deleteProduct(product){
    this._store.delete(product).catch(err => console.log(err))
  }

  updateProduct(updates){
    return this._store.update(updates)
      .then(pr => this._product.value = pr)
      .catch(err => console.log(err))
  }

  async createFileAsset(files){
    const { formData, fileName } = this._files.createFormData(files)
    const ownerId = this._product.value!._id

    return await this._files.uploadFile({ ownerId, fileName, formData })
  }

  async uploadProductImage(files){
    if (!files.length) return

    const asset: IProductAsset = await this.createFileAsset(files)

    if (asset && asset.url) {
      let { assets } = this._product.value!
      assets = assets || []
      asset.main = asset.main || !assets.length

      if (asset.main) {
        await this._files.updateFile({
          _id: asset._id,
          main: true
        })
      }

      assets.push(asset)

      await this.updateProduct({
        _id: asset.ownerId,
        assets
      })
    }
  }

  async deleteProductImage(url){
    const ownerId = this._product.value!._id

    await this._files.deleteFile({ ownerId, url })

    let assets = this._product.value!.assets?.filter(it => it.url !== url)
    this._product.value!.assets = assets!

    if (assets && assets.length && !assets?.find(it => it.main)) {
      assets[0] = await this._files.updateFile({
        _id: assets?.[0]._id,
        main: true
      })
    }

    await this.updateProduct({
      _id: ownerId,
      assets
    })
  }

  static create(){
    if (Service.instance) return Service.instance

    Service.instance = new Service({
      store: useProductStore(),
      appStore: useAppStore(),
      filesService: useFilesService()
    })

    return Service.instance
  }
}

export const useProductService = () => Service.create()
