import { defineComponent, toRaw, PropType, ref, watch } from 'vue'
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
    'update:variant-option',
    'upload:variant-image',
    'delete:variant-image'
  ],

  setup(props, { emit }){
    const currentVariant = ref<Maybe<IVariant>>(null)
    const existsVariants = ref<IVariant[]>([])
    let isEditingMode = false

    const genOptionPattern = () => ({
      _id: '',
      variantId: '',
      name: '',
      quantity: 0,
      price: 0,
      description: null,
      assets: []
    })

    const optionPattern = ref<IVariantOption>(genOptionPattern())

    const setExistsVariants = (vars) => {
      const map = existsVariants.value.reduce((acc, it) => {
        acc[it.group] = it
        return acc
      }, {})

      vars?.forEach(v => {
        map[v.group] = v
      })

      existsVariants.value = Object.values(map)
    }

    const createOption = (validate) => {
      validate()
        .then(() => {
          optionPattern.value.variantId = currentVariant.value!._id

          const rawOption = toRaw(optionPattern.value)

          if (isEditingMode) {
            emit('update:variant-option', rawOption)
          } else {
            emit('create:variant-option', rawOption)
          }
        })
    }

    const removeVariantOption = (variant, option) => {
      emit('delete:variant-option', { variant, option })
    }

    const setCurrentVariant = (variant) => {
      optionPattern.value = genOptionPattern()
      currentVariant.value = variant
    }

    const setOptionForEditing = (option) => {
      isEditingMode = true
      optionPattern.value = option
    }

    const onUploadVariantImage = ([ file ], option) => {
      emit('upload:variant-image', { file, option })
    }

    const onDeleteVariantImage = (asset, variant) => {
      const option = toRaw(optionPattern.value)
      emit('delete:variant-image', { asset, option, variant })
    }

    const clearVariantOptionForm = () => {
      isEditingMode = false
      optionPattern.value = genOptionPattern()
    }

    watch(() => props.variantItems, (variants) => {
      setExistsVariants(variants)

      if (!currentVariant.value) {
        setCurrentVariant(existsVariants.value[0])
      }

    }, { immediate: true })

    watch(() => props.variants, (variants) => {
      if (variants!.length) {
        setExistsVariants(variants)
      } else {
        setExistsVariants(props.variantItems)
      }

      if (currentVariant.value) {
        setCurrentVariant(variants?.find(
          v => v._id === currentVariant.value!._id) || existsVariants.value?.[0]
        )
      } else {
        currentVariant.value = variants?.[0] || existsVariants.value?.[0]!
      }

    }, { immediate: true })

    return {
      optionPattern,
      currentVariant,
      existsVariants,
      createOption,
      removeVariantOption,
      clearVariantOptionForm,
      onUploadVariantImage,
      onDeleteVariantImage,
      setCurrentVariant,
      setOptionForEditing
    }
  }
})
