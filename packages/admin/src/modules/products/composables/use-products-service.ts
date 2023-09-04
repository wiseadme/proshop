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
    IProductQuery,
    IUnit,
    IVariant,
    Maybe,
} from '@proshop/types'

// Helpers
import { clone } from '@shared/helpers'
import { getCategoriesIds } from '@modules/products/helpers'

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
        return _productsStore.read(getRequestParams(params))
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
        updates.id = unref(product)!.id

        if (updates.categories?.length) {
            updates.categories = getCategoriesIds(updates)
        }

        const updated = await _productsStore.update(updates)

        setAsCurrent(updated)

        return updated
    }

    const getVariantsWithOptionsIds = (variants) => {
        return variants.map((v) => {
            v.options = v.options!.map(o => o.id) as []

            return v
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

    const createAsset = async ({
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
    }): Promise<IProduct> => {

        await _optionsService.deleteOption(option)

        let { variants } = unref(product)!

        variant.options = variant.options?.filter(it => it.id !== option.id)

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

        const optionAsset = await createAsset({ file, ownerId: option.id })

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
            // @ts-ignore
            assets: option.assets?.filter((a: IAsset) => a.id !== asset.id),
        })
    }

    const deleteProduct = (product: IProduct) => {
        _productsStore.delete(product).catch(err => console.log(err))
    }

    const uploadProductImage = async (file: File) => {
        if (!file) return

        const asset: IAsset = await createAsset({ file, ownerId: unref(product)!.id })
        const { assets = [] } = unref(product)!

        asset.main = asset.main || !assets.length

        if (asset.main) {
            await _filesService.updateFile({
                id: asset.id,
                main: true,
            })
        }

        assets.push(asset)

        return updateProduct({ assets })
    }

    const deleteProductImage = async (asset: IAsset) => {
        await _filesService.deleteFile(asset)

        const assets = unref(product)!.assets?.filter(it => it.id !== asset.id)
        const mainImage = assets?.find(it => it.main)

        unref(product)!.assets = clone(assets)!

        if (assets?.length && !mainImage) {
            assets[0] = await _filesService.updateFile({ id: assets[0].id, main: true })
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
