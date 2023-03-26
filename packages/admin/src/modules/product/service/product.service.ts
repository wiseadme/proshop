import { ref, Ref, unref } from 'vue'
// Stores
import { useProductStore } from '@modules/product/store'
import { useAttributesStore } from '@modules/attribute/store'
import { useCategoriesStore } from '@modules/category/store'
import { useVariantsStore } from '@modules/variant/store'
import { useUnitsStore } from '@modules/unit/store'
import { useMetaTagsStore } from '@modules/metatag/store'
// Services
import { useFilesService } from '@shared/services/files.service'
import { useOptionsService } from '@shared/services/options.service'
// Composables
import { RequestParams } from '@shared/helpers/request-params'
// Types
import {
  IProduct,
  IAsset,
  IVariant,
  IVariantOption,
  IProductQuery,
  ICategory,
} from '@ecommerce-platform/types'
import { clone } from '@shared/helpers'
import { createSharedComposable } from '@shared/features/create-shared-composable'

class Service extends RequestParams {
  private _store: ReturnType<typeof useProductStore>
  private _attributesStore: ReturnType<typeof useAttributesStore>
  private _categoriesStore: ReturnType<typeof useCategoriesStore>
  private _unitsStore: ReturnType<typeof useUnitsStore>
  private _variantsStore: ReturnType<typeof useVariantsStore>
  private _metaTagsStore: ReturnType<typeof useMetaTagsStore>
  private _product: Ref<Maybe<IProduct>>
  private _filesService: ReturnType<typeof useFilesService>
  private _optionsService: ReturnType<typeof useOptionsService>

  constructor({
    store,
    attributesStore,
    categoriesStore,
    unitsStore,
    variantsStore,
    metaTagsStore,
    filesService,
    optionsService,
  }) {
    super()
    this._store = store
    this._attributesStore = attributesStore
    this._unitsStore = unitsStore
    this._categoriesStore = categoriesStore
    this._variantsStore = variantsStore
    this._metaTagsStore = metaTagsStore
    this._filesService = filesService
    this._optionsService = optionsService
    this._product = ref(null)
  }

  get products() {
    return this._store.products
  }

  get productsByCategory() {
    return this._store.productsByCategory
  }

  get product() {
    return this._product.value
  }

  get attributes() {
    return this._attributesStore.attributes
  }

  get categories() {
    return this._categoriesStore.categories
  }

  get units() {
    return this._unitsStore.units
  }

  get variants() {
    return this._variantsStore.variants!
  }

  get metaTags() {
    return this._metaTagsStore.metaTags
  }

  get totalLength() {
    return this._store.totalLength
  }

  getAttributes() {
    return this.attributes || this._attributesStore.read()
  }

  getUnits() {
    return this.units || this._unitsStore.read()
  }

  getCategories() {
    return this.categories || this._categoriesStore.read()
  }

  getVariants() {
    return this.variants || this._variantsStore.read()
  }

  getMetaTags(params = {}) {
    return this.metaTags || this._metaTagsStore.read(params)
  }

  getProducts(params: IProductQuery = {}) {
    const query = {
      ...params,
      ...this.getPaginationParams(),
      ...this.getSortParams()
    }

    return this._store.read(query).catch(err => console.log(err))
  }

  getCategoryProducts(category: ICategory) {
    this.getProducts({
      ...{ category: category.url },
      ...this.getPaginationParams(),
      ...this.getSortParams()
    }).then(res => console.log(res))
  }

  setAsCurrent(product: IProduct) {
    this._product.value = clone(product)
  }

  createProduct(product: IProduct) {
    return this._store.create(product)
      .catch(err => console.log(err))
  }

  async createVariantOption(option: IVariantOption) {
    const createdOption = await this._optionsService.createOption(option)
    const { variants } = unref(this._product)!

    let variant = variants?.find(v => v._id === option.variantId)!

    if (!variant) {
      variant = this.variants!.find(v => v._id === createdOption.variantId) as IVariant
      variants.push(variant)
    }

    const optionIds = variant.options?.map(o => o._id) || []
    optionIds?.push(createdOption._id)

    variant.options = optionIds as any

    await this.updateProduct({
      _id: this._product.value!._id,
      variants
    })

    variant.options = []
  }

  async updateVariantOption(option) {
    const updated = await this._optionsService.updateOption(option)

    const { variants } = this._product.value!
    const varInd = variants.findIndex(v => v._id === option.variantId)!

    const optInd = variants[varInd].options?.findIndex(it => it._id === option._id)

    variants[varInd].options?.splice(optInd!, 1, updated)

    await this.updateProduct({
      _id: this._product.value!._id,
      variants
    })
  }

  async deleteVariantOption({ option, variant }) {
    await this._optionsService.deleteOption(option)

    let { variants } = unref(this._product)!

    variant.options = variant.options?.filter(it => it._id !== option._id)

    if (!variant.options?.length) {
      variants = variants.filter(v => v._id !== variant._id)
    }

    await this.updateProduct({
      _id: unref(this._product)!._id,
      variants
    })
  }

  deleteProduct(product) {
    this._store.delete(product).catch(err => console.log(err))
  }

  async updateProduct(updates) {
    this._product.value = await this._store.update(updates)

    return unref(this._product)
  }

  async createAsset(file, ownerId) {
    const { formData, fileName } = this._filesService.createFormData(file)

    return this._filesService.uploadFile({ ownerId, fileName, formData })
  }

  async uploadProductVariantImage(file, option) {
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

  async deleteProductVariantImage({ asset, option }) {
    await this._filesService.deleteFile(asset)

    const updates = {
      _id: option._id,
      assets: option.assets.filter(a => a._id !== asset._id)
    }

    return await this._optionsService.updateOption(updates)
  }

  async uploadProductImage(file) {
    if (!file) {
      return
    }

    const product = unref(this._product)
    const asset: IAsset = await this.createAsset(file, product?._id)

    if (asset && asset.url) {
      let { assets = [] } = this._product.value!

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

  async deleteProductImage(asset) {
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
}

export const useProductService = createSharedComposable(() => new Service({
  store: useProductStore(),
  attributesStore: useAttributesStore(),
  categoriesStore: useCategoriesStore(),
  unitsStore: useUnitsStore(),
  variantsStore: useVariantsStore(),
  metaTagsStore: useMetaTagsStore(),
  filesService: useFilesService(),
  optionsService: useOptionsService(),
}))
