import { defineComponent, ref, watch, computed, PropType } from 'vue'

export const CategoryActionsModal = defineComponent({
  props: {
    modelValue: Boolean,
    isUpdate: Boolean,
    title: String,
    url: String,
    image: String,
    parent: [ Object, String ] as PropType<ICategory | string>,
    order: Number,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    isVisible: Boolean,
    categories: {
      type: Array as PropType<Array<ICategory>>,
      default: null
    }
  },

  emits: [
    'update:modelValue',
    'update:title',
    'update:url',
    'update:image',
    'update:parent',
    'update:order',
    'update:seoTitle',
    'update:seoDescription',
    'update:seoKeywords',
    'update:isVisible',
    'delete:image',
    'upload:image',
    'update',
    'create',
    'upload'
  ],

  setup(props, { emit }){
    const files = ref<Maybe<any>>([])

    const computedTitleProp = computed<string | undefined>({
      get(){
        return props.title
      },
      set(val){
        return emit('update:title', val)
      }
    })

    const computedUrlProp = computed<string | undefined>({
      get(){
        return props.url
      },
      set(val){
        return emit('update:url', val)
      }
    })

    const computedImageProp = computed<string | undefined>({
      get(){
        return props.image
      },
      set(val){
        return emit('update:image', val)
      }
    })

    const computedSeoTitleProp = computed<string | undefined>({
      get(){
        return props.seoTitle
      },
      set(val){
        return emit('update:seoTitle', val)
      }
    })

    const computedSeoDescProp = computed<string | undefined>({
      get(){
        return props.seoDescription
      },
      set(val){
        return emit('update:seoDescription', val)
      }
    })

    const computedSeoKeywordsProp = computed<string | undefined>({
      get(){
        return props.seoKeywords
      },
      set(val){
        return emit('update:seoKeywords', val)
      }
    })

    const computedOrderProp = computed<number | undefined>({
      get(){
        return props.order
      },
      set(val){
        return emit('update:order', val)
      }
    })

    const computedParentProp = computed<Maybe<ICategory>>({
      get(){
        const id = props.isUpdate ? (props.parent as ICategory)?._id : props.parent
        return props.parent ? props.categories.find(it => it._id === id)! : null
      },
      set(val: ICategory){
        return emit('update:parent', props.isUpdate ? val : val._id)
      }
    })

    const computedIsVisibleProp = computed<boolean>({
      get(){
        return props.isVisible
      },
      set(val){
        emit('update:isVisible', val)
      }
    })

    watch(() => props.image, () => files.value = [])

    const onCreate = (validate) => {
      validate().then(() => emit('create'))
    }

    const onUpdate = (validate) => {
      validate()
        .then(() => emit('update'))
        .then(() => {
          files.value = []
        })
    }

    const onSubmit = validate => {
      if (props.isUpdate) onUpdate(validate)
      if (!props.isUpdate) onCreate(validate)
    }

    const onDeleteImage = () => {
      emit('delete:image', computedImageProp.value)
    }

    const onLoadImage = event => {
      if (!event.length) return
      emit('upload:image', event)
    }

    return {
      onCreate,
      onLoadImage,
      onDeleteImage,
      onUpdate,
      onSubmit,
      files,
      computedParentProp,
      computedTitleProp,
      computedImageProp,
      computedUrlProp,
      computedSeoTitleProp,
      computedSeoDescProp,
      computedSeoKeywordsProp,
      computedOrderProp,
      computedIsVisibleProp
    }
  }
})
