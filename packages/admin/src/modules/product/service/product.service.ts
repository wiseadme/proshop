import { Store } from 'nervue'
import { ref, Ref } from 'vue'
// Stores
import { useProductStore } from '@modules/product/store'
// Services
import { useFilesService } from '@shared/services/files.service'
// Types
import { IProductState, IProductActions, IProduct, IProductAsset } from '../types'
import { clone } from '@shared/helpers'

class Service {
  private _store: Store<string, IProductState, {}, {}, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  private _files: ReturnType<typeof useFilesService>
  static instance: Service

  constructor({ store, filesService }){
    this._store = store
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
    return this._store._exposed.ATTRIBUTE.attributes
  }

  get categories(){
    return this._store._exposed.CATEGORY.categories
  }

  get units(){
    return this._store._exposed.UNIT.units
  }

  get variants(){
    return this._store._exposed.VARIANT.variants
  }

  async getAttributes(){
    if (this._store._exposed.ATTRIBUTE.attributes) {
      return this._store._exposed.ATTRIBUTE.attributes
    }

    await this._store._exposed.ATTRIBUTE.read()
  }

  async getUnits(){
    if (this._store._exposed.UNIT.units) {
      return this._store._exposed.UNIT.units
    }

    await this._store._exposed.UNIT.read()
  }

  async getCategories(){
    if (this._store._exposed.CATEGORY.categories) {
      return this._store._exposed.CATEGORY.categories
    }

    await this._store._exposed.CATEGORY.read()
  }

  async getVariants(){
    if (this._store._exposed.VARIANT.variants) {
      return this._store._exposed.VARIANT.variants
    }

    await this._store._exposed.VARIANT.read()
  }

  getProducts(){
    return this._store.read().catch(err => console.log(err))
  }

  setAsCurrent(product: IProduct){
    this._product.value = clone(product)
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

  async createFileAsset(file){
    const { formData, fileName } = this._files.createFormData(file)
    const ownerId = this._product.value!._id

    return await this._files.uploadFile({ ownerId, fileName, formData })
  }

  async uploadProductVariantImage(image, option, variantId){
    const ownerId = this._product.value!._id
    const optionAsset = await this.createFileAsset(image)
    let { variants } = this._product.value!

    const updates = clone(option)

    updates.assets = option.assets.map(it => it._id)

    updates.assets.push(optionAsset._id)

    const idx = variants.findIndex(v => v._id === variantId)

    variants[idx].options = Array.from(variants[idx].options, opt => {
      if (opt._id === option._id) return updates
      return opt
    })

    await this.updateProduct({
      _id: ownerId,
      variants
    })

    return optionAsset
  }

  async deleteProductVariantImage({ asset, option, variant }){
    let { variants } = this._product.value!

    await this._files.deleteFile({ ownerId: asset.ownerId, url: asset.url })

    variants = variants.filter(v => v._id !== variant._id)

    option.assets = option.assets.filter(a => a._id !== asset._id)

    variant.options = variant.options.filter(o => o._id !== option._id)

    variant.options.push(option)

    variants.push(variant)

    await this.updateProduct({
      _id: asset.ownerId,
      variants
    })
  }

  async uploadProductImage(file){
    if (!file) return

    const asset: IProductAsset = await this.createFileAsset(file)

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

      const product = await this.updateProduct({
        _id: asset.ownerId,
        assets
      }) as IProduct

      this._product.value!.assets = product.assets
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
      filesService: useFilesService()
    })

    return Service.instance
  }
}

export const useProductService = () => Service.create()
