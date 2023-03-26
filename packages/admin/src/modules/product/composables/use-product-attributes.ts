import { computed, ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IAttribute } from '@ecommerce-platform/types'

export const useProductAttributes = () => {
  const { attributeItems } = useProductsService()
  const { model } = useProduct()

  const attributes = ref<IAttribute[]>([])

  const usedAttributesMap = computed<Record<string, boolean>>(() => unref(model).attributes.reduce((map, attr) => {
    map[attr.key!] = true

    return map
  }, {}))
  const usedAttributes = computed<IAttribute[]>(() => unref(model).attributes)
  const availableAttributes = computed<IAttribute[]>(() => unref(attributeItems)?.filter(it => !unref(usedAttributesMap)[it.key!]) || [])

  const onUpdateAttributes = () => {
    unref(model).attributes = unref(usedAttributes)
  }

  const onDeleteAttribute = (attr) => {
    unref(model).attributes = unref(model).attributes.filter(it => it.key !== attr.key)
    attributes.value = unref(model).attributes
  }

  return {
    attributes,
    availableAttributes,
    attributeItems,
    usedAttributes,
    onUpdateAttributes,
    onDeleteAttribute
  }
}
