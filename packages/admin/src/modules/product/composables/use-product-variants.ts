import { ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'

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

  const genVariantOptionPattern = () => ({
    _id: '',
    variantId: '',
    name: '',
    quantity: 0,
    price: 0,
    description: null,
    assets: []
  })

  const onUploadProductVariantImage = ({ file, option }) => {
    return uploadProductVariantImage(file, option)
      .then((optionData) => option.assets = optionData.assets)
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

  const onCreateProductVariantOption = (option) => {
    createVariantOption(option).then(() => model.value.variants = unref(product)!.variants!)
  }

  const onUpdateProductVariantOption = (option) => {
    updateVariantOption(option).then(() => model.value.variants = unref(product)!.variants)
  }

  const onDeleteProductVariantOption = ({ option, variant }) => {
    deleteVariantOption({ option, variant }).then(() => model.value.variants = unref(product)?.variants!)
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
