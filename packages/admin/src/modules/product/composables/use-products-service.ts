import {
    computed,
    ref,
    unref
} from 'vue'
// Features
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'

// Stores
import { useProductStore } from '@modules/product/store'
import { useAttributesStore } from '@modules/attribute/store'
import { useCategoriesStore } from '@modules/category/store'
import { useVariantsStore } from '@modules/variant/store'
import { useUnitsStore } from '@modules/unit/store'
import { useMetaTagsStore } from '@modules/metatag/store'
import { useMerchantStore } from '@modules/settings/store/merchant'

// Services
import { useFilesService } from '@shared/services/files.service'
import { useOptionsService } from '@shared/services/options.service'

// Types
import {
    IAsset,
    IAttribute,
    ICategory,
    IMerchant,
    IMetaTag,
    IOption,
    IProduct,
    IProductQuery,
    IUnit,
    IVariant,
    Maybe
} from '@proshop/types'

// Helpers
import { clone } from '@shared/helpers'
import { getCategoriesIds } from '@modules/product/helpers'


export const useProductsService = createSharedComposable(() => {
    const _productsStore = useProductStore()
    const _attributesStore = useAttributesStore()
    const _categoriesStore = useCategoriesStore()
    const _variantsStore = useVariantsStore()
    const _unitsStore = useUnitsStore()
    const _metaTagsStore = useMetaTagsStore()
    const _merchantStore = useMerchantStore()

    const {
        sort,
        pagination,
        getSortParams,
        getPaginationParams,
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
    const merchant = computed<Maybe<IMerchant>>(() => _merchantStore.merchant)

    const { assign } = Object

    const getMerchant = () => {
        if (unref(merchant)?.id) return

        return _merchantStore.getMerchant()
    }

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
            ...getSortParams(),
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
        if (!unref(merchant)?.id) return

        product.currency = unref(merchant)?.id!

        if (product.categories?.length) {
            product.categories = getCategoriesIds(product)
        }

        return _productsStore.create(product).catch(err => console.log(err))
    }

    const updateProduct = async (updates) => {
        if (updates.categories?.length) {
            updates.categories = getCategoriesIds(updates)
        }

        const updated = await _productsStore.update(updates)

        setAsCurrent(updated)

        return updated
    }

    const createVariantOption = async (option: IOption) => {
        const createdOption = await _optionsService.createOption(option)
        const { variants } = unref(product)!

        let variant = variants?.find(v => v.id === option.variantId)!

        if (!variant) {
            variant = unref(variantItems)!.find(v => v.id === createdOption.variantId) as IVariant
            variants.push(variant)
        }

        const optionIds = variant.options?.map(o => o.id) || []
        optionIds?.push(createdOption.id)

        variant.options = optionIds as any

        await updateProduct({ id: unref(product)!.id, variants })

        variant.options = []
    }

    const createAsset = async (file, ownerId) => {
        const { formData, fileName } = _filesService.createFormData(file)

        return _filesService.uploadFile({ ownerId, fileName, formData })
    }

    const updateVariantOption = async (option) => {
        const updated = await _optionsService.updateOption(option)

        const { variants } = unref(product)!
        const varInd = variants.findIndex(v => v.id === option.variantId)!

        const optInd = variants[varInd].options?.findIndex(it => it.id === option.id)

        variants[varInd].options?.splice(optInd!, 1, updated)

        return updateProduct({ id: unref(product)!.id, variants })
    }

    const deleteVariantOption = async ({ option, variant }) => {
        await _optionsService.deleteOption(option)

        let { variants } = unref(product)!

        variant.options = variant.options?.filter(it => it.id !== option.id)

        if (!variant.options?.length) {
            variants = variants.filter(v => v.id !== variant.id)
        }

        return updateProduct({ id: unref(product)!.id, variants })
    }

    const uploadProductVariantImage = async (file, option): Promise<IOption> => {
        const optionAsset = await createAsset(file, option.id)
        option.assets.push(optionAsset)

        return _optionsService.updateOption({
            id: option.id,
            assets: option.assets.map(asset => asset.id),
        })
    }

    const deleteProductVariantImage = async ({ asset, option }): Promise<IOption> => {
        await _filesService.deleteFile(asset)

        return _optionsService.updateOption({
            id: option.id,
            assets: option.assets.filter(a => a.id !== asset.id),
        })
    }

    const deleteProduct = (product: IProduct) => {
        _productsStore.delete(product).catch(err => console.log(err))
    }

    const uploadProductImage = async (file) => {
        if (!file) return

        const asset: IAsset = await createAsset(file, unref(product)?.id)

        const { assets = [] } = unref(product)!

        asset.main = asset.main || !assets.length

        if (asset.main) {
            await _filesService.updateFile({ id: asset.id, main: true })
        }

        assets.push(asset)

        return updateProduct({ id: unref(product)?.id, assets })
    }

    const deleteProductImage = async (asset: IAsset) => {
        await _filesService.deleteFile(asset)

        const assets = unref(product)!.assets?.filter(it => it.id !== asset.id)

        unref(product)!.assets = clone(assets)!

        if (assets?.length && !assets?.find(it => it.main)) {
            assets[0] = await _filesService.updateFile({ id: assets?.[0].id, main: true })
        }

        return updateProduct({ id: asset.ownerId, assets })
    }

    return {
        sort,
        pagination,
        product,
        products,
        categoryProducts,
        attributeItems,
        categoryItems,
        variantItems,
        unitItems,
        metaTagItems,
        totalLength,
        getMerchant,
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
        deleteProductImage,
    }
})
