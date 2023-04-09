import { computed, ref, unref } from 'vue'
import { useMetaTagsService } from '@modules/metatag/composables/use-meta-tags-service'
import { clone } from '@shared/helpers'
import { descriptorToMetaTag } from '@shared/helpers/metatag'

export const useMetaTag = () => {
  const { setAsCurrent } = useMetaTagsService()

  const isEditMode = ref<boolean>(false)
  const metaProps = ref({
    props: {},
    order: 0
  })
  const metaPropertyPattern = ref({
    key: '',
    value: ''
  })

  const displayMeta = computed(() => descriptorToMetaTag(unref(metaProps).props))
  const isDescriptorHasKeys = computed(() => Object.keys(unref(metaProps).props).length)
  const saveBtnTitle = computed(() => unref(isEditMode) ? 'Изменить' : 'Сохранить')

  const clearMetaPattern = () => {
    unref(metaPropertyPattern).key = ''
    unref(metaPropertyPattern).value = ''
  }

  const clearMetaProps = () => {
    unref(metaProps).props = {}
    unref(metaProps).order = 0
  }

  const clearAll = () => {
    clearMetaPattern()
    clearMetaProps()

    isEditMode.value = false
    setAsCurrent(null)
  }

  const addPropsToMeta = async (validate) => {
    await validate()

    const key = unref(metaPropertyPattern).key.toLowerCase()
    unref(metaProps).props[key] = unref(metaPropertyPattern).value
    clearMetaPattern()
  }

  const onEditMetaTag = (metaTagDescriptor) => {
    setAsCurrent(metaTagDescriptor)

    unref(metaProps).props = clone(metaTagDescriptor.props)
    unref(metaProps).order = metaTagDescriptor.order

    isEditMode.value = true
  }

  return {
    displayMeta,
    isDescriptorHasKeys,
    saveBtnTitle,
    isEditMode,
    metaProps,
    metaPropertyPattern,
    addPropsToMeta,
    clearAll,
    onEditMetaTag,
  }
}
