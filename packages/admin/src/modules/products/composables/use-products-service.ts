import {
    computed,
    ref,
    unref,
} from 'vue'
// Features
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'

// Stores
import { useProductStore } from '@modules/products/store'
import { useAttributesStore } from '@modules/attributes/store'
import { useCategoriesStore } from '@modules/categories/store'
import { useVariantsStore } from '@modules/variants/store'
import { useUnitsStore } from '@modules/units/store'
import { useMetaTagsStore } from '@modules/metatags/store'
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
    IUnit,
    IVariant,
    Maybe,
} from '@proshop/types'

// Helpers
import { clone } from '@shared/helpers'
import { getIds } from '@modules/products/helpers'

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
        getPaginationParams,
        getRequestParams,
    } = useRequestParams()

    const _filesService = useFilesService()
    const _optionsService = useOptionsService()

    const product = ref<Maybe<IProduct>>(null)
    const isLoading = ref(true)

    const products = computed<IProduct[]>(() => _productsStore.products || [])
    const attributeItems = computed<IAttribute[]>(() => _attributesStore.attributes || [])
    const categoryItems = computed<ICategory[]>(() => _categoriesStore.categories || [])
    const variantItems = computed<IVariant[]>(() => _variantsStore.variants || [])
    const unitItems = computed<IUnit[]>(() => _unitsStore.units || [])
    const metaTagItems = computed<IMetaTag[]>(() => _metaTagsStore.metaTags || [])
    const totalLength = computed<number>(() => _productsStore.totalLength)
    const merchant = computed<Maybe<IMerchant>>(() => _merchantStore.merchant)

    const setAsCurrent = (item: Maybe<IProduct>) => {
        product.value = clone(item!)
    }

    const getMerchant = async (): Promise<IMerchant> => {
        if (unref(merchant)?.id) {
            return unref(merchant)!
        }

        return _merchantStore.getMerchant()
    }

    const getAttributes = async (): Promise<IAttribute[]> => {
        if (unref(attributeItems).length) {
            return unref(attributeItems)!
        }

        return _attributesStore.read()
    }

    const getUnits = async (): Promise<IUnit[]> => {
        if (unref(unitItems).length) {
            return unref(unitItems)!
        }

        return _unitsStore.read()
    }

    const getCategories = async (): Promise<ICategory[]> => {
        if (unref(categoryItems).length) {
            return unref(categoryItems)!
        }

        return _categoriesStore.getCategories()
    }

    const getVariants = async (): Promise<IVariant[]> => {
        if (unref(variantItems).length) {
            return unref(variantItems)!
        }

        return _variantsStore.read()
    }

    const getMetaTags = async (): Promise<IMetaTag[]> => {
        if (unref(metaTagItems).length) {
            return unref(metaTagItems)!
        }

        return _metaTagsStore.read()
    }

    const getProducts = async (params?: Partial<IProduct>): Promise<IProduct[]> => {
        const products = await _productsStore.getProducts(getRequestParams(params))

        isLoading.value = false

        return products
    }

    const getProduct = async (id: string): Promise<IProduct> => {
        const [item] = await _productsStore.getProducts({ id })

        setAsCurrent(clone(item))

        return item
    }

    const getCategoryProducts = async (category: ICategory): Promise<IProduct[]> => {
        const params = { category: category.url, ...getPaginationParams() }

        try {
            return await _productsStore.getProducts(params)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const createProduct = async (product: IProduct): Promise<IProduct> => {
        if (!unref(merchant)?.id) {
            return Promise.reject()
        }

        product.currency = unref(merchant)?.id!

        try {
            const data = await _productsStore.createProduct(product)
            setAsCurrent(data)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProduct = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id

        try {
            const updated = await _productsStore.updateProduct(updates)
            setAsCurrent(updated)

            return updated
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductRelatedProducts = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id
        updates.related = getIds(updates.related!)

        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductCategories = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id
        updates.categories = getIds(updates.categories!)

        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductAttributes = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id

        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductVariant = async (variant: IVariant): Promise<IProduct> => {
        variant.ownerId = unref(product)!.id

        try {
            const product = await _productsStore.addVariant(variant)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductVariantOption = async (option: IOption): Promise<IProduct> => {
        try {
            const data = await _productsStore.addVariantOption(option)

            setAsCurrent(data)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const createProductOption = async (option: IOption): Promise<IOption> => {
        try {
            return await _optionsService.createOption(option)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductOption = async (updates: Partial<IOption>): Promise<IOption> => {
        try {
            return await _optionsService.updateOption(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addNewVariantOption = async (data: IOption): Promise<void> => {
        try {
            const option = await createProductOption(data)
            const { variants } = unref(product)!

            let variant = variants?.find(v => v.id === option.variantId)!

            if (!variant) {
                variant = unref(variantItems)!.find(v => v.id === option.variantId) as IVariant
                await addProductVariant(variant)
            }

            await addProductVariantOption(option)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateVariantOption = async (option: IOption): Promise<IOption> => {
        try {
            const updated = await updateProductOption(option)
            const { variants } = unref(product)!

            const variant = variants.find(v => v.id === option.variantId)!
            const { options } = variant

            variant.options = options?.map(opt => opt.id === option.id ? updated : opt)

            return updated
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteVariantOption = async ({ option, variant }: { option: IOption, variant: IVariant }): Promise<void> => {
        try {
            let data: IProduct

            await _optionsService.deleteOption(option)

            if (variant.options!.length <= 1) {
                data = await _productsStore.deleteVariant(variant)
            } else {
                data = await _productsStore.deleteVariantOption(option)
            }

            setAsCurrent(data)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductAttribute = async (attr: IAttribute): Promise<IProduct> => {
        const updates = {
            productId: unref(product)!.id,
            attribute: attr,
        }

        try {
            const product = await _productsStore.addAttribute(updates)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductAttribute = async (id: string): Promise<IProduct> => {
        const updates = {
            productId: unref(product)!.id,
            attributeId: id,
        }

        try {
            const product = await _productsStore.deleteAttribute(updates)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductInfo = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id

        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductMetaTags = async (metaTags: IMetaTag[]): Promise<IProduct> => {
        const payload = {
            productId: unref(product)!.id,
            metaTags,
        }

        try {
            return await _productsStore.updateMetaTags(payload)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductMetaTag = async (metaTag: IMetaTag): Promise<IProduct> => {
        const updates = {
            productId: unref(product)!.id,
            metaTag: metaTag,
        }

        try {
            const product = await _productsStore.addMetaTag(updates)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductMetaTag = async (metaTag: IMetaTag): Promise<IProduct> => {
        const payload = {
            productId: unref(product)!.id,
            metaTagId: metaTag.id,
        }

        try {
            return await _productsStore.deleteMetaTag(payload)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const loadImage = async ({ file, ownerId }: { file: File, ownerId: string }): Promise<IAsset> => {
        try {
            const { formData, fileName } = _filesService.createFormData(file)

            return await _filesService.uploadFile({ ownerId, fileName, formData })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProduct = async (product: IProduct) => {
        try {
            return await _productsStore.deleteProduct(product)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateImageAsset = async (update: Partial<IAsset>): Promise<IAsset> => {
        try {
            return await _filesService.updateFile({
                id: update.id,
                main: true,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductAssets = async (assets: Partial<IAsset>[]) => {
        try {
            return await _filesService.updateMany(assets)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductMainImage = async (asset: IAsset) => {
        try {
            return await updateProduct({
                id: asset.ownerId,
                image: asset.url,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const uploadProductImage = async (file: File): Promise<IProduct> => {
        try {
            const asset = await loadImage({
                ownerId: unref(product)!.id,
                file,
            }) as IAsset

            asset.main = !unref(product)?.assets.length
            const assets = [...unref(product)!.assets, asset] as IAsset[]

            if (asset.main) {
                await updateProductAssets([asset])
            }

            return await updateProduct({
                id: asset.ownerId,
                assets: getIds(assets),
                ...(asset.main ? { image: asset.url } : {}),
            })

        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductImage = async (asset: IAsset) => {
        await _filesService.deleteFile(asset)

        const assets = (unref(product)!.assets as IAsset[])?.filter(it => it.id !== asset.id)

        if (assets.length && asset.main) {
            assets[0] = await updateImageAsset({
                id: assets[0].id,
                main: true,
            })
        }

        await updateProduct({
            assets: getIds(assets),
            ...(asset.main ? { image: assets.length ? assets[0].url : null } : {}),
        })
    }

    const onInit = async () => {
        await Promise.all([
            getCategories(),
            getAttributes(),
            getProducts(),
            getVariants(),
            getMetaTags(),
            getMerchant(),
            getUnits(),
        ])

        isLoading.value = false
    }

    return {
        isLoading,
        sort,
        pagination,
        product,
        products,
        attributeItems,
        categoryItems,
        variantItems,
        unitItems,
        metaTagItems,
        totalLength,
        onInit,
        getMerchant,
        getAttributes,
        getUnits,
        getCategories,
        getVariants,
        getMetaTags,
        getProducts,
        getProduct,
        getCategoryProducts,
        setAsCurrent,
        createProduct,
        addProductAttribute,
        addProductMetaTag,
        addNewVariantOption,
        uploadProductImage,
        updateProduct,
        updateImageAsset,
        updateProductCategories,
        updateProductInfo,
        updateProductMetaTags,
        updateProductAttributes,
        updateProductRelatedProducts,
        updateVariantOption,
        updateProductAssets,
        updateProductMainImage,
        deleteProduct,
        deleteProductAttribute,
        deleteVariantOption,
        deleteProductMetaTag,
        deleteProductImage,
    }
})
