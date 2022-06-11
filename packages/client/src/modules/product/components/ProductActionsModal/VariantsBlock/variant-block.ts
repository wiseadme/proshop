import { defineComponent, PropType, ref, watch } from 'vue'
import { clone } from '@shared/helpers'
// import { clone } from '@shared/helpers'

export const variantsBlock = defineComponent({
  name: 'variant-block',
  props: {
    variantItems: Array as PropType<Array<IVariant>>,
    variants: Array as PropType<Array<IProductVariant>>
  },
  emits: [ 'update:variants' ],
  setup(props, { emit }){
    const variantsMap: Map<string, IProductVariant> = new Map()
    const displayedVariants = ref<Array<IProductVariant>>([])
    const displayedOptions = ref<Array<IProductVariantOption>>([])
    const selectedVariants = ref<Array<IProductVariant>>([])

    const genVariantOption = () => ({
      name: '',
      count: 0,
      price: 0,
      description: '',
      assets: []
    })

    const prepareVariantPatterns = () => {
      props.variantItems?.forEach(v => {
        variantsMap.set(v.group, { group: v.group, options: [] })
      })
    }

    const setProductVariants = () => {
      props.variants?.forEach(v => variantsMap.set(v.group, clone(v)))
    }

    const addOptionInVariant = (variant, optionIndex) => {
      variant.options.push(displayedOptions.value[optionIndex])
      displayedOptions.value[optionIndex] = genVariantOption()

      variantsMap.set(variant.group, variant)

      emit('update:variants', selectedVariants.value.filter(it => !!it.options.length))
    }

    const removeVariantOption = (variant, option) => {
      variant.options = variant.options.filter(it => it !== option)

      emit('update:variants', selectedVariants.value.filter(it => !!it.options.length))
    }

    const onChange = (val) => {
      console.log(val)
    }

    const updateOption = () => {
      if (!props.variants) return

      emit('update:variants', selectedVariants.value.filter(it => !!it.options.length))
    }

    watch(() => props.variantItems, () => {
      prepareVariantPatterns()
      setProductVariants()
      displayedVariants.value = Array.from(variantsMap.values())

      variantsMap.forEach(() => displayedOptions.value.push(genVariantOption()))

      selectedVariants.value = displayedVariants.value
    }, { immediate: true })

    return {
      displayedVariants,
      displayedOptions,
      selectedVariants,
      addOptionInVariant,
      removeVariantOption,
      updateOption,
      onChange
    }
  }
})
