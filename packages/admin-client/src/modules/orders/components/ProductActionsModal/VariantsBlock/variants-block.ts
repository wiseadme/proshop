import { defineComponent, PropType, ref, watch } from 'vue'
import { clone } from '@shared/helpers'
import { IVariant, IVariantOption } from '@modules/variant/types'

export const variantsBlock = defineComponent({
  name: 'variant-block',
  props: {
    isDisplayed: Boolean,
    variantItems: Array as PropType<Array<IVariant>>,
    variants: Array as PropType<Array<IVariant>>
  },
  emits: [ 'update:variants', 'update:variant-image' ],

  setup(props, { emit }) {
    const variantsMap: Map<string, IVariant> = new Map()
    const displayedVariants = ref<Array<IVariant>>([])
    const displayedOptions = ref<Array<IVariantOption>>([])
    const selectedVariants = ref<Array<IVariant>>([])

    const genVariantOption = () => ({
      name: '',
      count: 0,
      price: 0,
      description: '',
      assets: []
    })

    const prepareVariantPatterns = () => {
      props.variantItems?.forEach(v => variantsMap.set(v.group, v))
    }

    const setProductVariants = () => {
      selectedVariants.value = []

      props.variants?.forEach((v, i) => {
        selectedVariants.value.push(clone(v))
        variantsMap.set(v.group, selectedVariants.value[i])
      })
    }

    const addOptionInVariant = (validate, variant, optionIndex) => {
      validate()
        .then(() => {
          variant.options.push(displayedOptions.value[optionIndex])
          clearVariantOptionForm(optionIndex)

          variantsMap.set(variant.group, variant)
          emit('update:variants', selectedVariants.value)
        })
    }

    const removeVariantOption = (variant, optionIndex) => {
      variant.options.splice(optionIndex, 1)
      displayedOptions.value[optionIndex] = genVariantOption()
      emit('update:variants', selectedVariants.value)
    }

    const onChange = (val) => {
      selectedVariants.value = val
      emit('update:variants', selectedVariants.value)
    }

    const onEditChip = (it, index) => {
      displayedOptions.value[index] = it
    }

    const updateOption = () => {
      if (!props.variants) return

      emit('update:variants', selectedVariants.value.filter(it => !!it.options.length))
    }

    const updateAssets = (files, option) => {
      emit('update:variant-image', { files, option })

      const stop = watch(() => option, () => {
        emit('update:variants', selectedVariants.value.filter(it => !!it.options.length))
        stop()
      }, { deep: true })
    }

    const clearVariantOptionForm = (index) => {
      displayedOptions.value[index] = genVariantOption()
    }

    watch(() => [props.isDisplayed, props.variants], (to) => {
      if (!to) return

      prepareVariantPatterns()
      setProductVariants()
      displayedVariants.value = Array.from(variantsMap.values())

      variantsMap.forEach(() => displayedOptions.value.push(genVariantOption()))
    }, { immediate: true })

    return {
      displayedVariants,
      displayedOptions,
      selectedVariants,
      addOptionInVariant,
      removeVariantOption,
      clearVariantOptionForm,
      updateOption,
      updateAssets,
      onChange,
      onEditChip
    }
  }
})
