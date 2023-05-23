import {
    computed,
    ref,
    unref
} from 'vue'
// Features
import { createSharedComposable } from '@shared/features/create-shared-composable'

// Stores
import { useProductStore } from '@modules/product/store'
import { useAttributesStore } from '@modules/attribute/store'
import { useCategoriesStore } from '@modules/category/store'
import { useVariantsStore } from '@modules/variant/store'
import { useUnitsStore } from '@modules/unit/store'
import { useMetaTagsStore } from '@modules/metatag/store'
import { useRequestParams } from '@shared/composables/use-request-params'

// Services
import { useFilesService } from '@shared/services/files.service'
import { useOptionsService } from '@shared/services/options.service'

// Types
import {
    IAsset,
    IAttribute,
    ICategory,
    IMetaTag,
    IOption,
    IProduct,
    IProductQuery,
    IUnit,
    IVariant,
    IVariantOption,
    Maybe,
} from '@ecommerce-platform/types'

// Helpers
import { clone } from '@shared/helpers'

export const useProductsService = createSharedComposable(() => {
    const _productsStore = useProductStore()
    const _attributesStore = useAttributesStore()
    const _categoriesStore = useCategoriesStore()
    const _variantsStore = useVariantsStore()
    const _unitsStore = useUnitsStore()
    const _metaTagsStore = useMetaTagsStore()

    const {
        sort,
        pagination,
        getSortParams,
        getPaginationParams
    } = useRequestParams()

    const _filesService = useFilesService()
    const _optionsService = useOptionsService()

    const product = ref<Maybe<IProduct>>(null)

    const products = computed<Maybe<IProduct[]>>(() => _productsStore.products)
    const categoryProducts = computed<Maybe<IProduct[]>>(() => _productsStore.categoryProducts)
    const attributeItems = computed<Maybe<IAttribute[]>>(() => _attributesStore.attributes)
    const categoryItems = computed<Maybe<ICategory[]>>(() => _categoriesStore.categories)
    const variantItems = computed<Maybe<IVariant[]>>(() => _variantsStore.variants)
    const unitItems = computed<Maybe<IUnit[]>>(() => _unitsStore.units)
    const metaTagItems = computed<Maybe<IMetaTag[]>>(() => _metaTagsStore.metaTags)
    const totalLength = computed<number>(() => _productsStore.totalLength)

    const { assign } = Object

    const getAttributes = () => {
        if (unref(attributeItems)) return

        return _attributesStore.read()
    }

    const getUnits = () => {
        if (unref(unitItems)) return

        return _unitsStore.read()
    }

    const getCategories = () => {
        if (unref(categoryItems)) return

        return _categoriesStore.read()
    }

    const getVariants = () => {
        if (unref(variantItems)) return

        return _variantsStore.read()
    }

    const getMetaTags = () => {
        if (unref(metaTagItems)) return

        return _metaTagsStore.read()
    }

    const getProducts = (params?: IProductQuery) => {
        return _productsStore.read({
            ...(params || {}),
            ...getPaginationParams(),
            ...getSortParams()
        })
    }

    const getCategoryProducts = (category: ICategory) => {
        const query = assign({ category: category.url }, getPaginationParams())

        return _productsStore.read(query).catch(err => console.log(err))
    }

    const setAsCurrent = (item: Maybe<IProduct>) => {
        product.value = clone(item)
    }

    const createProduct = (product: IProduct) => {
        return _productsStore.create(product).catch(err => console.log(err))
    }

    const updateProduct = async (updates) => {
        const updated = await _productsStore.update(updates)
        setAsCurrent(updated)

        return updated
    }

    const createVariantOption = async (option: IVariantOption) => {
        const createdOption = await _optionsService.createOption(option)
        const { variants } = unref(product)!

        let variant = variants?.find(v => v._id === option.variantId)!

        if (!variant) {
            variant = unref(variantItems)!.find(v => v._id === createdOption.variantId) as IVariant
            variants.push(variant)
        }

        const optionIds = variant.options?.map(o => o._id) || []
        optionIds?.push(createdOption._id)

        variant.options = optionIds as any

        await updateProduct({ _id: unref(product)!._id, variants })

        variant.options = []
    }

    const createAsset = async (file, ownerId) => {
        const { formData, fileName } = _filesService.createFormData(file)

        return _filesService.uploadFile({ ownerId, fileName, formData })
    }

    const updateVariantOption = async (option) => {
        const updated = await _optionsService.updateOption(option)

        const { variants } = unref(product)!
        const varInd = variants.findIndex(v => v._id === option.variantId)!

        const optInd = variants[varInd].options?.findIndex(it => it._id === option._id)

        variants[varInd].options?.splice(optInd!, 1, updated)

        return updateProduct({ _id: unref(product)!._id, variants })
    }

    const deleteVariantOption = async ({ option, variant }) => {
        await _optionsService.deleteOption(option)

        let { variants } = unref(product)!

        variant.options = variant.options?.filter(it => it._id !== option._id)

        if (!variant.options?.length) {
            variants = variants.filter(v => v._id !== variant._id)
        }

        return updateProduct({ _id: unref(product)!._id, variants })
    }

    const uploadProductVariantImage = async (file, option): Promise<IOption> => {
        const optionAsset = await createAsset(file, option._id)
        option.assets.push(optionAsset)

        return _optionsService.updateOption({
            _id: option._id,
            assets: option.assets.map(asset => asset._id)
        })
    }

    const deleteProductVariantImage = async ({ asset, option }): Promise<IOption> => {
        await _filesService.deleteFile(asset)

        return _optionsService.updateOption({
            _id: option._id,
            assets: option.assets.filter(a => a._id !== asset._id)
        })
    }

    const deleteProduct = (product) => {
        _productsStore.delete(product).catch(err => console.log(err))
    }

    const uploadProductImage = async (file) => {
        if (!file) return

        const asset: IAsset = await createAsset(file, unref(product)?._id)
        const { assets = [] } = unref(product)!

        asset.main = asset.main || !assets.length

        if (asset.main) {
            await _filesService.updateFile({ _id: asset._id, main: true })
        }

        assets.push(asset)

        return updateProduct({ _id: unref(product)?._id, assets })
    }

    const deleteProductImage = async (asset) => {
        await _filesService.deleteFile(asset)

        const assets = unref(product)!.assets?.filter(it => it._id !== asset._id)
    unref(product)!.assets = clone(assets)!

    if (assets?.length && !assets?.find(it => it.main)) {
        assets[0] = await _filesService.updateFile({ _id: assets?.[0]._id, main: true })
    }

    return updateProduct({ _id: asset.ownerId, assets })
    }

    return {
        product,
        products,
        categoryProducts,
        attributeItems,
        categoryItems,
        variantItems,
        unitItems,
        metaTagItems,
        totalLength,
        pagination,
        sort,
        getAttributes,
        getUnits,
        getCategories,
        getVariants,
        getMetaTags,
        getProducts,
        getCategoryProducts,
        setAsCurrent,
        createProduct,
        createVariantOption,
        createAsset,
        updateProduct,
        deleteProduct,
        deleteProductVariantImage,
        uploadProductVariantImage,
        updateVariantOption,
        deleteVariantOption,
        uploadProductImage,
        deleteProductImage
    }
})
