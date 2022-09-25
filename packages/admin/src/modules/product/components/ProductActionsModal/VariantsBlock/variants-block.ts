import { defineComponent, PropType, ref, shallowRef, watch } from 'vue'
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
  emits: [
    'update:variants',
    'create:variant-option',
    'delete:variant-option',
    'upload:variant-image',
    'delete:variant-image'
  ],

  setup(props, { emit }){
    const displayedOptions = ref<Map<IVariant, IVariantOption>>(new Map())
    const selectedVariants = ref<Array<IVariant>>([])
    const existsVariantsMap = ref<Record<string, IVariant>>({})
    const currentEditableOption = shallowRef<Maybe<IVariantOption>>(null)

    const genVariantOption = (id) => ({
      variantId: id,
      name: '',
      quantity: 0,
      price: 0,
      description: null,
      assets: []
    })

    const setVariantOptions = (variant, it = null) => {
      displayedOptions.value.set(variant, it || genVariantOption(variant._id))
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
          emit('create:variant-option', option)
        })
    }

    const removeVariantOption = (variant, option) => {
      emit('delete:variant-option', { variant, option })
      if (option === currentEditableOption.value) {
        clearVariantOptionForm(variant)
      }
    }

    const toggleVariants = (val) => {
      selectedVariants.value = val
      emit('update:variants', selectedVariants.value)
    }

    const setOptionForEditing = (variant, option) => {
      currentEditableOption.value = option
      setVariantOptions(variant, option)
    }

    const updateOption = () => {
      if (!props.variants) return
      const updated = selectedVariants.value.filter(it => !!it.options.length)

      emit('update:variants', updated)
    }

    const onUploadVariantImage = ([ file ], option) => {
      emit('upload:variant-image', { file, option })
    }

    const onDeleteVariantImage = (asset, variant) => {
      const option = displayedOptions.value.get(variant)
      emit('delete:variant-image', { asset, option, variant })
    }

    const clearVariantOptionForm = (variant) => {
      displayedOptions.value.set(variant, genVariantOption(variant._id))
    }

    watch(() => props.variants, setProductVariants)

    watch(() => props.variantItems, (newItems) => {
      currentEditableOption.value = null
      newItems?.forEach((v) => setVariantOptions(v))
    }, { immediate: true })

    return {
      existsVariantsMap,
      displayedOptions,
      selectedVariants,
      currentEditableOption,
      addOptionInVariant,
      removeVariantOption,
      clearVariantOptionForm,
      updateOption,
      onUploadVariantImage,
      onDeleteVariantImage,
      toggleVariants,
      setOptionForEditing
    }
  }
})
