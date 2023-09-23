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

    const products = computed<Maybe<IProduct[]>>(() => _productsStore.products)
    const attributeItems = computed<Maybe<IAttribute[]>>(() => _attributesStore.attributes)
    const categoryItems = computed<Maybe<ICategory[]>>(() => _categoriesStore.categories)
    const variantItems = computed<Maybe<IVariant[]>>(() => _variantsStore.variants)
    const unitItems = computed<Maybe<IUnit[]>>(() => _unitsStore.units)
    const metaTagItems = computed<Maybe<IMetaTag[]>>(() => _metaTagsStore.metaTags)
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
        if (unref(attributeItems)) {
            return unref(attributeItems)!
        }

        return _attributesStore.read()
    }

    const getUnits = async (): Promise<IUnit[]> => {
        if (unref(unitItems)) {
            return unref(unitItems)!
        }

        return _unitsStore.read()
    }

    const getCategories = async (): Promise<ICategory[]> => {
        if (unref(categoryItems)) {
            return unref(categoryItems)!
        }

        return _categoriesStore.getCategories()
    }

    const getVariants = async (): Promise<IVariant[]> => {
        if (unref(variantItems)) {
            return unref(variantItems)!
        }

        return _variantsStore.read()
    }

    const getMetaTags = async (): Promise<IMetaTag[]> => {
        if (unref(metaTagItems)) {
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

        product.value = clone(item)

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

    const createProduct = async (product: IProduct): Promise<IProduct | undefined> => {
        if (!unref(merchant)?.id) return

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

    const addProductVariant = async (variant: IVariant) => {
        const updates = {
            productId: unref(product)!.id,
            variant,
        }

        try {
            const product = await _productsStore.addVariant(updates)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductVariantOption = async (option: IOption) => {
        const updates = {
            productId: unref(product)!.id,
            option,
        }

        try {
            const product = await _productsStore.addVariantOption(updates)

            setAsCurrent(product)

            return product
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addProductAttribute = async (attr: IAttribute) => {
        const updates = {
            productId: unref(product)!.id,
            attribute: attr,
        }

        try {
            const updated = await _productsStore.addAttribute(updates)

            setAsCurrent(updated)

            return true
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductAttribute = async (id: string) => {
        const updates = {
            productId: unref(product)!.id,
            attributeId: id,
        }

        try {
            const updated = await _productsStore.deleteAttribute(updates)

            setAsCurrent(updated)

            return true
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

    const addProductMetaTag = async (metaTag: IMetaTag) => {
        const updates = {
            productId: unref(product)!.id,
            metaTag: metaTag,
        }

        try {
            const updated = await _productsStore.addMetaTag(updates)

            setAsCurrent(updated)

            return true
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductMetaTag = async (metaTag: IMetaTag) => {
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

    const loadImage = async ({ file, ownerId }: { file: File, ownerId: string }) => {
        try {
            const { formData, fileName } = _filesService.createFormData(file)

            return await _filesService.uploadFile({ ownerId, fileName, formData })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getVariantsWithOptionsIds = (variants: IVariant[]): IVariant[] => {
        return variants.map((v) => {
            const payload = { ...v } as any

            payload.options = getIds(v.options as IOption[])

            return payload
        })
    }

    const createProductOption = async (option: IOption): Promise<IOption> => {
        try {
            return await _optionsService.createOption(option)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductOption = async (updates) => {
        try {
            return await _optionsService.updateOption(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const addNewVariantOption = async (data: IOption) => {
        const option = await createProductOption(data)
        const { variants } = unref(product)!

        let variant = variants?.find(v => v.id === option.variantId)!

        if (!variant) {
            variant = unref(variantItems)!.find(v => v.id === option.variantId) as IVariant
            await addProductVariant(variant)
        }

        // variant.options ??= [] as IOption[]
        // variant.options.push(option as any)

        await addProductVariantOption(option)

        // await updateProduct({
        //     variants: getVariantsWithOptionsIds(variants),
        // })
    }

    const updateVariantOption = async (option: IOption) => {
        const updated = await updateProductOption(option)
        const { variants } = unref(product)!

        const variant = variants.find(v => v.id === option.variantId)!
        const { options } = variant

        variant.options = options?.map(opt => opt.id === option.id ? updated : opt)

        return updateProduct({
            variants: getVariantsWithOptionsIds(variants),
        })
    }

    const deleteVariantOption = async ({
        option,
        variant,
    }: {
        option: IOption
        variant: IVariant
    }): Promise<IProduct | void> => {

        await _optionsService.deleteOption(option)

        let { variants } = unref(product)!

        variant.options = (variant.options as IOption[])?.filter((it) => it.id !== option.id)

        if (!variant.options?.length) {
            variants = variants.filter(v => v.id !== variant.id)
        }

        return updateProduct({
            variants: getVariantsWithOptionsIds(variants),
        })
    }

    const deleteProduct = async (product: IProduct) => {
        try {
            return await _productsStore.deleteProduct(product)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductAssets = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)?.id

        try {
            return await updateProduct(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateMainImageAsset = (asset: IAsset): Promise<IAsset> => {
        return _filesService.updateFile({
            id: asset.id,
            main: true,
        })
    }

    const uploadProductImage = async (file: File): Promise<IAsset> => {
        try {
            const asset = await loadImage({
                file,
                ownerId: unref(product)!.id,
            })

            const { assets = [] } = unref(product)!
            const isMain = asset.main || !assets.length

            if (isMain) {
                return await updateMainImageAsset(asset)
            }

            return asset
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteProductImage = async (asset: IAsset) => {
        await _filesService.deleteFile(asset)

        const assets = unref(product)!.assets?.filter(it => it.id !== asset.id)
        const mainImage = assets?.find(it => it.main)

        if (assets?.length && !mainImage) {
            assets[0] = await updateMainImageAsset(assets[0])
        }

        return updateProduct({ assets })
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
        updateProduct,
        updateMainImageAsset,
        updateProductCategories,
        updateProductInfo,
        updateProductMetaTags,
        addProductAttribute,
        addProductMetaTag,
        addNewVariantOption,
        updateProductAttributes,
        updateProductRelatedProducts,
        updateVariantOption,
        uploadProductImage,
        updateProductAssets,
        deleteProduct,
        deleteProductAttribute,
        deleteVariantOption,
        deleteProductMetaTag,
        deleteProductImage,
    }
})
