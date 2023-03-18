import { ref, Ref, unref } from 'vue'
// Stores
import { useProductStore } from '@modules/product/store'
import { useAttributeStore } from '@modules/attribute/store'
import { useCategoryStore } from '@modules/category/store'
import { useVariantStore } from '@modules/variant/store'
import { useUnitStore } from '@modules/unit/store'
import { useMetaTagsStore } from '@modules/metatag/store'
// Services
import { useFilesService } from '@shared/services/files.service'
import { useOptionsService } from '@shared/services/options.service'
// Composables
import { usePagination } from '@shared/composables/use-pagination'
import { useSort } from '@shared/composables/use-sort'
// Types
import {
  IProduct,
  IAsset,
  IVariant,
  IVariantOption,
  IRequestPagination,
  IRequestSort,
  IProductQuery,
  ICategory,
  IRequestParams
} from '@ecommerce-platform/types'
import { clone } from '@shared/helpers'

class Service {
  private _store: ReturnType<typeof useProductStore>
  private _attributesStore: ReturnType<typeof useAttributeStore>
  private _categoriesStore: ReturnType<typeof useCategoryStore>
  private _unitsStore: ReturnType<typeof useUnitStore>
  private _variantsStore: ReturnType<typeof useVariantStore>
  private _metaTagsStore: ReturnType<typeof useMetaTagsStore>
  private _product: Ref<Maybe<IProduct>>
  private _filesService: ReturnType<typeof useFilesService>
  private _optionsService: ReturnType<typeof useOptionsService>
  public pagination: ReturnType<typeof usePagination>
  public sort: ReturnType<typeof useSort>

  constructor({
    store,
    attributesStore,
    categoriesStore,
    unitsStore,
    variantsStore,
    metaTagsStore,
    filesService,
    optionsService,
    pagination,
    sort
  }) {
    this._store = store
    this._attributesStore = attributesStore
    this._unitsStore = unitsStore
    this._categoriesStore = categoriesStore
    this._variantsStore = variantsStore
    this._metaTagsStore = metaTagsStore
    this._filesService = filesService
    this._optionsService = optionsService
    this._product = ref(null)
    this.pagination = pagination
    this.sort = sort
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

  makeRequestParams(params: Maybe<IProductQuery> = null): IRequestParams<IProductQuery> {
    return {
      ...(params ? params : {}),
      ...this.prepareRequestSortParams(),
      ...this.prepareRequestPagination(),
    }
  }

  prepareRequestPagination(): IRequestPagination {
    return {
      page: unref(this.pagination.page),
      count: unref(this.pagination.itemsCount),
      length: true,
    }
  }

  prepareRequestSortParams(): IRequestSort | object {
    return this.sort.isNeedToBeSorted.value ? {
      asc: unref(this.sort.asc),
      desc: unref(this.sort.desc),
      key: unref(this.sort.sortKey),
    } : {}
  }

  getProducts(params: IProductQuery = {}) {
    const query = this.makeRequestParams(params)

    return this._store.read(query).catch(err => console.log(err))
  }

  getCategoryProducts(category: ICategory) {
    this.getProducts(this.makeRequestParams({
      category: category.url
    })).then(res => console.log(res))
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

export const useProductService = () => new Service({
  store: useProductStore(),
  attributesStore: useAttributeStore(),
  categoriesStore: useCategoryStore(),
  unitsStore: useUnitStore(),
  variantsStore: useVariantStore(),
  metaTagsStore: useMetaTagsStore(),
  filesService: useFilesService(),
  optionsService: useOptionsService(),
  pagination: usePagination(),
  sort: useSort()
})
