import {
    computed,
    ref,
    unref,
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'

import type {
    IAsset,
    IAttribute,
    ICategory,
    IMerchant,
    IMetaTag,
    IProduct,
    IProductParams,
    IUnit,
    IVariant,
    Maybe,
} from '@proshop-app/types'

import { useAttributesStore } from '@modules/attributes/store'
import { useCategoriesStore } from '@modules/categories/store'
import { useMetaTagsStore } from '@modules/metatags/store'
import { getIds } from '@modules/products/helpers'
import { useProductStore } from '@modules/products/store'
import { useMerchantStore } from '@modules/settings/store/merchant'
import { useUnitsStore } from '@modules/units/store'
import { useVariantsStore } from '@modules/variants/store'
import { useFilesService } from '@shared/services/files.service'

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

    const isLoading = ref(true)

    const products = computed<IProduct[]>(() => _productsStore.products || [])
    const attributeItems = computed<IAttribute[]>(() => _attributesStore.attributes || [])
    const categoryItems = computed<ICategory[]>(() => _categoriesStore.categories || [])
    const variantItems = computed<IVariant[]>(() => _variantsStore.variants || [])
    const unitItems = computed<IUnit[]>(() => _unitsStore.units || [])
    const metaTagItems = computed<IMetaTag[]>(() => _metaTagsStore.metaTags || [])
    const totalLength = computed<number>(() => _productsStore.totalLength)
    const merchant = computed<Maybe<IMerchant>>(() => _merchantStore.merchant)

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

    const getProduct = async (sku: string): Promise<IProduct> => {
        const [item] = await _productsStore.getProducts({ sku })

        return item
    }

    const getCategoryProducts = async (category: ICategory): Promise<IProduct[]> => {
        try {
            return await _productsStore.getProducts({
                category: category.url,
                ...getPaginationParams()
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const createProduct = async (product: IProduct): Promise<IProduct> => {
        if (!unref(merchant)?.id) return Promise.reject({
            message: 'Для начала необходимо создать Merchant',
        })

        try {
            product.currency = unref(merchant)!.currency

            return await _productsStore.createProduct(product)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProduct = async (updates: Partial<IProductParams>): Promise<IProduct> => {
        try {
            return await _productsStore.updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductRelatedProducts = async (updates: { id: string, related: IProduct[] }): Promise<IProduct> => {
        try {
            return await updateProduct({
                ...updates,
                related: getIds(updates.related!),
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductCategories = async (updates: { id: string, categories: ICategory[] }): Promise<IProduct> => {
        try {
            return await updateProduct({
                ...updates,
                categories: getIds(updates.categories!)
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductAttributes = async (updates: { id: string, attributes: IAttribute[] }): Promise<IProduct> => {
        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductAttribute = async (updates: { id: string, attribute: IAttribute }): Promise<IProduct> => {
        try {
            return await _productsStore.addAttribute(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductAttribute = async (params: { id: string, attributeId: string }): Promise<IProduct> => {
        try {
            return await _productsStore.deleteAttribute(params)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductInfo = async (updates: Partial<IProduct>): Promise<IProduct> => {
        try {
            return await updateProduct(updates as Partial<IProductParams>)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductMetaTags = async (params: { id: string, metaTags: IMetaTag[] }): Promise<IProduct> => {
        try {
            return await _productsStore.updateMetaTags({
                productId: params.id,
                metaTags: params.metaTags,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductMetaTag = async (params: { id: string, metaTag: IMetaTag }): Promise<IProduct> => {
        try {
            return await _productsStore.addMetaTag({
                productId: params.id,
                metaTag: params.metaTag,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductMetaTag = async (params: { id: string, metaTag: IMetaTag }): Promise<IProduct> => {
        try {
            return await _productsStore.deleteMetaTag({
                productId: params.id,
                metaTagId: params.metaTag.id,
            })
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

    const uploadProductImage = async (params: { id: string, file: File, assets: IAsset[] }): Promise<IProduct> => {
        try {
            const asset = await loadImage({
                ownerId: params.id,
                file: params.file,
            }) as IAsset

            asset.main = !params.assets.length
            const assets = [...params.assets, asset] as IAsset[]

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

    const deleteProductImage = async (params: { asset: IAsset, assets: IAsset[] }): Promise<IProduct> => {
        await _filesService.deleteFile(params.asset)

        const assets = params.assets.filter(it => it.id !== params.asset.id)

        if (assets.length && params.asset.main) {
            assets[0] = await updateImageAsset({
                id: assets[0].id,
                main: true,
            })
        }

        return await updateProduct({
            id: params.asset.ownerId,
            assets: getIds(assets),
            ...(params.asset.main ? { image: assets.length ? assets[0].url : null } : {}),
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
        createProduct,
        addProductAttribute,
        addProductMetaTag,
        uploadProductImage,
        updateProduct,
        updateImageAsset,
        updateProductCategories,
        updateProductInfo,
        updateProductMetaTags,
        updateProductAttributes,
        updateProductRelatedProducts,
        updateProductAssets,
        updateProductMainImage,
        deleteProduct,
        deleteProductAttribute,
        deleteProductMetaTag,
        deleteProductImage,
    }
})
