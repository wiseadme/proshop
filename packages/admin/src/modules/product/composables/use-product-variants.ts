import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IOption, IProduct } from '@proshop/types'
import { clone } from '@shared/helpers'

export const useProductVariants = () => {
    const { model } = useProduct()

    const {
        product,
        variantItems,
        updateProduct,
        createVariantOption,
        updateVariantOption,
        deleteVariantOption,
        uploadProductVariantImage,
        deleteProductVariantImage,
    } = useProductsService()

    const isVariantEditMode = ref(false)

    const genVariantOptionPattern = (): IOption => ({
        id: '',
        variantId: '',
        name: '',
        quantity: 0,
        price: 0,
        description: null,
        modelAttribute: null,
        assets: [],
    })

    const onUploadProductVariantOptionImage = async ({ file, option }) => {
        const optionData = await uploadProductVariantImage({ file, option })
        option.assets = optionData.assets
    }

    const onDeleteProductVariantOptionImage = ({ asset, option }) => {
        deleteProductVariantImage({ asset, option })
            .then(() => {
                option.assets = option.assets.reduce((assets, it) => {
                    if (it.id !== asset.id) assets.push(it)

                    return assets
                }, [])
            })
    }

    const onCreateProductVariantOption = async (option) => {
        await createVariantOption(option)
        model.value.variants = unref(product)!.variants!
    }

    const onUpdateProductVariantOption = async (option) => {
        await updateVariantOption(option)
        model.value.variants = unref(product)!.variants
    }

    const onDeleteProductVariantOption = async ({ option, variant }) => {
        await deleteVariantOption({ option, variant })
        model.value.variants = unref(product)?.variants!
    }

    const onSelectParentProduct = (product: IProduct) => {
        const variants = clone(product.variants)

        /** TODO - подумать над типом, исправить any */
        variants.forEach(variant => {
            variant.options = variant.options!.map(option => option.id) as any
        })

        return updateProduct({
            id: unref(model).id,
            variants
        })
    }

    return {
        isVariantEditMode,
        variantItems,
        genVariantOptionPattern,
        onUploadProductVariantOptionImage,
        onSelectParentProduct,
        onDeleteProductVariantOptionImage,
        onCreateProductVariantOption,
        onUpdateProductVariantOption,
        onDeleteProductVariantOption,
    }
}
