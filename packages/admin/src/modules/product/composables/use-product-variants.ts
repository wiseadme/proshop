import { ref } from 'vue'
import { useProductService } from '@modules/product/service/product.service'
import { useProduct } from '@modules/product/composables/use-product'

export const useProductVariants = () => {
  const { model, variantItems } = useProduct()
  const productService = useProductService()

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
    return productService.uploadProductVariantImage(file, option)
      .then((optionData) => option.assets = optionData.assets)
  }

  const onDeleteProductVariantImage = ({ asset, option }) => {
    productService.deleteProductVariantImage({ asset, option })
      .then(() => {
        option.assets = option.assets.reduce((assets, it) => {
          if (it._id !== asset._id) assets.push(it)

          return assets
        }, [])
      })
  }

  const onCreateProductVariantOption = (option) => {
    productService.createVariantOption(option)
      .then(() => model.value.variants = productService.product!.variants!)
  }

  const onUpdateProductVariantOption = (option) => {
    productService.updateVariantOption(option)
      .then(() => model.value.variants = productService.product!.variants)
  }

  const onDeleteProductVariantOption = ({ option, variant }) => {
    productService.deleteVariantOption({ option, variant })
      .then(() => model.value.variants = productService.product?.variants!)
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
