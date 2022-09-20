import { defineComponent, PropType, ref, watch } from 'vue'
import { clone } from '@shared/helpers'
import { IVariant, IVariantOption } from '@modules/variant/types'

export const variantsBlock = defineComponent({
  name: 'variant-block',
  props: {
    isDisplayed: Boolean,
    isUpdate: Boolean,
    variantItems: Array as PropType<Array<IVariant>>,
    variants: Array as PropType<Array<IVariant>>
  },
  emits: [ 'update:variants', 'update:variant-image' ],

  setup(props, { emit }){
    const displayedOptions = ref<Map<IVariant, IVariantOption>>(new Map())
    const selectedVariants = ref<Array<IVariant>>([])
    const existsVariantsMap = ref<Record<string, IVariant>>({})

    const genVariantOption = () => ({
      name: '',
      count: 0,
      price: 0,
      description: '',
      assets: []
    })

    const setVariantOptions = (variant, it = null) => {
      displayedOptions.value.set(variant, it || genVariantOption())
    }

    const setProductVariants = () => {
      const selected = {}

      props.variantItems?.forEach(v => {
        existsVariantsMap.value[v.group] = v
      })

      props.variants?.forEach(v => {
        existsVariantsMap.value[v.group] = clone(v)
        selected[v.group] = existsVariantsMap.value[v.group]

        setVariantOptions(selected[v.group])
      })

      selectedVariants.value = Object.values(selected)
    }

    const addOptionInVariant = (validate, variant) => {
      validate()
        .then(() => {
          const option = displayedOptions.value.get(variant)

          const idx = variant.options.indexOf(option)

          if (idx > -1) {
            variant.options.splice(idx, 1, option)
          } else {
            variant.options.push(option)
          }

          setVariantOptions(variant)

          emit('update:variants', selectedVariants.value)
        })
    }

    const removeVariantOption = (variant, optionIndex) => {
      variant.options.splice(optionIndex, 1)

      if (!variant.options.length) {
        const idx = selectedVariants.value.indexOf(variant)
        selectedVariants.value.splice(idx, 1)
      }

      setVariantOptions(variant)

      emit('update:variants', selectedVariants.value)
    }

    const toggleVariants = (val) => {
      selectedVariants.value = val
      emit('update:variants', selectedVariants.value)
    }

    const setOptionForEditing = (variant, it) => {
      setVariantOptions(variant, it)
    }

    const updateOption = () => {
      if (!props.variants) return
      const updated = selectedVariants.value.filter(it => !!it.options.length)

      emit('update:variants', updated)
    }

    const updateAssets = (files, option, variantId) => {
      emit('update:variant-image', { files, option, variantId })
    }

    const clearVariantOptionForm = (variant) => {
      displayedOptions.value.set(variant, genVariantOption())
    }

    watch(() => props.variants, setProductVariants)

    watch(() => props.variantItems, (to) => {
      to?.forEach((v) => setVariantOptions(v))
    }, { immediate: true })

    return {
      existsVariantsMap,
      displayedOptions,
      selectedVariants,
      addOptionInVariant,
      removeVariantOption,
      clearVariantOptionForm,
      updateOption,
      updateAssets,
      toggleVariants,
      setOptionForEditing
    }
  }
})
