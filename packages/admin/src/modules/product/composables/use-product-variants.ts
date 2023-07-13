import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IOption } from '@proshop/types'

export const useProductVariants = () => {
    const { model } = useProduct()

    const {
        product,
        variantItems,
        createVariantOption,
        updateVariantOption,
        deleteVariantOption,
        uploadProductVariantImage,
        deleteProductVariantImage,
    } = useProductsService()

    const isVariantEditMode = ref(false)

    const genVariantOptionPattern = (): IOption => ({
        _id: '',
        variantId: '',
        name: '',
        quantity: 0,
        price: 0,
        description: null,
        url: '',
        assets: []
    })

    const onUploadProductVariantOptionImage = async ({ file, option }) => {
        const optionData = await uploadProductVariantImage(file, option)
        option.assets = optionData.assets
    }

    const onDeleteProductVariantOptionImage = ({ asset, option }) => {
        deleteProductVariantImage({ asset, option })
            .then(() => {
                option.assets = option.assets.reduce((assets, it) => {
                    if (it._id !== asset._id) assets.push(it)

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

    return {
        isVariantEditMode,
        variantItems,
        genVariantOptionPattern,
        onUploadProductVariantOptionImage,
        onDeleteProductVariantOptionImage,
        onCreateProductVariantOption,
        onUpdateProductVariantOption,
        onDeleteProductVariantOption
    }
}
