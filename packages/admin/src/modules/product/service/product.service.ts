import { Store } from 'nervue'
import { ref, Ref, unref } from 'vue'
// Stores
import { useProductStore } from '@modules/product/store'
// Services
import { useFilesService } from '@shared/services/files.service'
import { useOptionsService } from '@shared/services/options.service'

// Types
import { IProductState, IProductActions, IProduct, IProductAsset } from '../types'
import { clone } from '@shared/helpers'
import { IVariantOption } from '@modules/variant/types'

class Service {
  private _store: Store<string, IProductState, {}, {}, IProductActions>
  private _product: Ref<Maybe<IProduct>>
  private _filesService: ReturnType<typeof useFilesService>
  private _optionsService: ReturnType<typeof useOptionsService>
  static instance: Service

  constructor({ store, filesService, optionsService }){
    this._store = store
    this._product = ref(null)
    this._filesService = filesService
    this._optionsService = optionsService
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

  getProducts(id = ''){
    return this._store.read(id).catch(err => console.log(err))
  }

  setAsCurrent(product: IProduct){
    this._product.value = clone(product)
  }

  createProduct(product: IProduct){
    return this._store.create(product)
      .catch(err => console.log(err))
  }

  async createVariantOption(option: IVariantOption){
    const optionData = await this._optionsService.createOption(option)

    const { variants } = this._product.value!

    let variant = variants?.find(v => v._id === option.variantId)!

    if (!variant) {
      variant = this.variants.find(v => v._id === optionData.variantId)
      variants.push(variant)
    }

    const optionIds = variant.options.map(o => o._id)
    optionIds.push(optionData._id)

    variant.options = optionIds as any

    await this.updateProduct({
      _id: this._product.value!._id,
      variants
    })

    variant.options = []
  }

  async updateVariantOption(option){
    const updated = await this._optionsService.updateOption(option)

    const { variants } = this._product.value!
    const varInd = variants.findIndex(v => v._id === option.variantId)!

    const optInd = variants[varInd].options.findIndex(it => it._id === option._id)

    variants[varInd].options.splice(optInd, 1, updated)

    await this.updateProduct({
      _id: this._product.value!._id,
      variants
    })
  }

  async deleteVariantOption(option){
    await this._optionsService.deleteOption(option)

    let { variants } = this._product.value!
    const variant = variants.find(v => v._id === option.variantId)!

    variant.options = variant.options.filter(it => it._id !== option._id)

    if (!variant.options.length) {
      variants = variants.filter(v => v._id !== variant._id)
    }

    await this.updateProduct({
      _id: this._product.value!._id,
      variants
    })
  }

  deleteProduct(product){
    this._store.delete(product).catch(err => console.log(err))
  }

  async updateProduct(updates){
    const updated = await this._store.update(updates)
    this._product.value = updated

    return updated
  }

  async createAsset(file, ownerId){
    const { formData, fileName } = this._filesService.createFormData(file)

    return await this._filesService.uploadFile({
      ownerId,
      fileName,
      formData
    })
  }

  async uploadProductVariantImage(file, option){
    const optionAsset = await this.createAsset(file, option._id)

    const updates = {
      _id: option._id,
      assets: [
        ...option.assets.map(a => a._id),
        optionAsset._id
      ]
    }

    return await this._optionsService.updateOption(updates)
  }

  async deleteProductVariantImage({ asset, option }){
    await this._filesService.deleteFile(asset)

    const updates = {
      _id: option._id,
      assets: option.assets.filter(a => a._id !== asset._id)
    }

    return await this._optionsService.updateOption(updates)
  }

  async uploadProductImage(file){
    if (!file) return

    const product = unref(this._product)

    const asset: IProductAsset = await this.createAsset(file, product?._id)

    if (asset && asset.url) {
      let { assets } = this._product.value!
      assets = assets || []
      asset.main = asset.main || !assets.length

      if (asset.main) {
        await this._filesService.updateFile({
          _id: asset._id,
          main: true
        })
      }

      assets.push(asset)

      await this.updateProduct({
        _id: product?._id,
        assets
      })
    }
  }

  async deleteProductImage(asset){
    await this._filesService.deleteFile(asset)

    let assets = this._product.value!.assets?.filter(it => it._id !== asset._id)
    this._product.value!.assets = assets!

    if (assets && assets.length && !assets?.find(it => it.main)) {
      assets[0] = await this._filesService.updateFile({
        _id: assets?.[0]._id,
        main: true
      })
    }

    await this.updateProduct({
      _id: asset.ownerId,
      assets
    })
  }

  static create(){
    if (Service.instance) return Service.instance

    Service.instance = new Service({
      store: useProductStore(),
      filesService: useFilesService(),
      optionsService: useOptionsService()
    })

    return Service.instance
  }
}

export const useProductService = () => Service.create()
