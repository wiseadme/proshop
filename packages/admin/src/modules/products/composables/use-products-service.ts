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
        product.value = clone(item)
    }

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

    const getProducts = async (params?: Partial<IProduct>) => {
        const products = await _productsStore.read(getRequestParams(params))

        isLoading.value = false

        return products
    }

    const getProduct = async (id: string) => {
        const [item] = await _productsStore.read({ id })

        product.value = clone(item)

        return item
    }

    const getCategoryProducts = async (category: ICategory) => {
        const params = { category: category.url, ...getPaginationParams() }

        try {
            return await _productsStore.read(params)
        } catch (err) {
            return console.log(err)
        }
    }

    const createProduct = async (product: IProduct) => {
        if (!unref(merchant)?.id) return

        product.currency = unref(merchant)?.id!

        try {
            return await _productsStore.create(product)
        } catch (err) {
            return console.log(err)
        }
    }

    const updateProduct = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id

        try {
            const updated = await _productsStore.update(updates)
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
            const updated = await _productsStore.update(updates)
            setAsCurrent(updated)

            return updated
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateProductCategories = async (updates: Partial<IProduct>): Promise<IProduct> => {
        updates.id = unref(product)!.id
        updates.categories = getIds(updates.categories!)

        try {
            const updated = await _productsStore.update(updates)
            setAsCurrent(updated)

            return updated
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

    const createVariantOption = async (option: IOption) => {
        const payload = { ...option } as Record<string, any>

        payload.assets = option.assets?.map(asset => asset.id)
        const createdOption = await _optionsService.createOption(payload)

        const { variants } = unref(product)!

        let variant = variants?.find(v => v.id === option.variantId)!

        if (!variant) {
            variant = unref(variantItems)!.find(v => v.id === createdOption.variantId) as IVariant
            variants.push(variant)
        }

        variant.options ??= []
        variant.options.push(createdOption)

        await updateProduct({
            variants: getVariantsWithOptionsIds(variants),
        })

        variant.options = []
    }

    const loadImage = ({
        file,
        ownerId,
    }: {
        file: File
        ownerId: string
    }) => {
        const { formData, fileName } = _filesService.createFormData(file)

        return _filesService.uploadFile({ ownerId, fileName, formData })
    }

    const updateVariantOption = async (option: IOption) => {
        const payload = { ...option } as Record<string, any>
        payload.assets = option.assets?.map(asset => asset.id)

        const updated = await _optionsService.updateOption(payload)
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

    const uploadProductVariantImage = async ({
        file,
        option,
    }: {
        file: File,
        option: IOption
    }): Promise<IOption> => {

        const optionAsset = await loadImage({ file, ownerId: option.id })

        option.assets!.push(optionAsset)

        return _optionsService.updateOption({
            id: option.id,
            assets: option.assets!.map(asset => asset.id),
        })
    }

    const deleteProductVariantImage = async ({
        asset,
        option,
    }: {
        asset: IAsset
        option: IOption
    }): Promise<IOption> => {
        await _filesService.deleteFile(asset)

        return _optionsService.updateOption({
            id: option.id,
            assets: option.assets?.filter((a: IAsset) => a.id !== asset.id),
        })
    }

    const deleteProduct = async (product: IProduct) => {
        try {
            return await _productsStore.delete(product)
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
        createVariantOption,
        updateProduct,
        deleteProduct,
        deleteProductVariantImage,
        uploadProductVariantImage,
        updateMainImageAsset,
        updateProductCategories,
        updateProductRelatedProducts,
        updateVariantOption,
        uploadProductImage,
        updateProductAssets,
        deleteVariantOption,
        deleteProductImage,
    }
})
