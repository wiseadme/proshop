import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IVariantOption } from '@ecommerce-platform/types'

export const useProductVariants = () => {
  const { model } = useProduct()
  const {
    product,
    variantItems,
    uploadProductVariantImage,
    deleteProductVariantImage,
    createVariantOption,
    updateVariantOption,
    deleteVariantOption,
  } = useProductsService()

  const isVariantEditMode = ref(false)

  const genVariantOptionPattern = (): IVariantOption => ({
    _id: '',
    variantId: '',
    name: '',
    quantity: 0,
    price: 0,
    description: null,
    assets: []
  })

  const onUploadProductVariantImage = async ({ file, option }) => {
    const optionData = await uploadProductVariantImage(file, option)
    option.assets = optionData.assets
  }

  const onDeleteProductVariantImage = ({ asset, option }) => {
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
    onUploadProductVariantImage,
    onDeleteProductVariantImage,
    onCreateProductVariantOption,
    onUpdateProductVariantOption,
    onDeleteProductVariantOption
  }
}
