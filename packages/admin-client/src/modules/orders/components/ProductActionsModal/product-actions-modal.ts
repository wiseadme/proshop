import { defineComponent, ref, reactive, toRaw, computed, PropType, watch, shallowRef } from 'vue'
import { TextEditor } from '@shared/components/TextEditor'
import { clone } from '@shared/helpers'
import draggable from 'vuedraggable'

// Components
import VariantsBlock from './VariantsBlock'

// Types
import { IVariant } from '@modules/variant/types'
import { IProductAsset } from '@modules/product/types'

export const productActionsModal = defineComponent({
  components: {
    TextEditor,
    VariantsBlock,
    draggable
  },
  props: {
    modelValue: Boolean,
    isUpdate: Boolean,
    hasChanges: Boolean,
    categoryItems: Array as PropType<Array<ICategory>>,
    unitItems: Array as PropType<Array<IUnit>>,
    variantItems: Array as PropType<Array<IVariant>>,
    name: String,
    url: String,
    description: String,
    price: Number,
    quantity: Number,
    unit: Object as PropType<IUnit>,
    isVisible: Boolean,
    image: String,
    seo: Object,
    categories: Array as PropType<Array<ICategory>>,
    attributes: Array as PropType<Array<IAttribute>>,
    variants: Array as PropType<Array<IVariant>>,
    assets: Array as PropType<Array<IProductAsset>>
  },
  emits: [
    'update:modelValue',
    'update:name',
    'update:price',
    'update:description',
    'update:image',
    'update:assets',
    'update:attributes',
    'update:variants',
    'update:seo',
    'update:categories',
    'update:quantity',
    'update:unit',
    'update:isVisible',
    'update:seo:title',
    'update:seo:description',
    'update:seo:keywords',
    'update:url',
    'upload:image',
    'delete:image',
    'update:variant-image',
    'create',
    'close',
    'discard',
    'update'
  ],

  async setup(props, { emit }){
    const ctgMap = ref<Map<string, ICategory>>(new Map())
    const productImages = ref<Array<File>>([])
    const attributesArray = ref<Array<IAttribute>>([])
    const currentImage = ref<Maybe<IProductAsset>>(null)

    const content = shallowRef<string>('')
    const textEditorKey = shallowRef<string>('')

    const imagesContextMenu = reactive({
      show: false,
      positionX: 0,
      positionY: 0,
    })

    const computedName = computed<string>({
      get(){
        return props.name!
      },
      set(val){
        emit('update:name', val)
      }
    })

    const computedPrice = computed<number>({
      get(){
        return props.price!
      },
      set(val){
        emit('update:price', +val)
      }
    })

    const computedDescription = computed<string>({
      get(){
        return content.value!
      },
      set(val){
        emit('update:description', val)
      }
    })

    const computedUnit = computed<IUnit>({
      get(){
        return props.unit!
      },
      set(val){
        emit('update:unit', val)
      }
    })

    const computedQuantity = computed<number>({
      get(){
        return props.quantity!
      },
      set(val){
        emit('update:quantity', +val)
      }
    })

    const computedUrl = computed<string>({
      get(){
        return props.url!
      },
      set(val){
        emit('update:url', val)
      }
    })

    const computedImage = computed<string>({
      get(){
        return props.image!
      },
      set(val){
        emit('update:image', val)
      }
    })

    const computedAssets = computed<Array<IProductAsset>>({
      get(){
        return props.assets!
      },
      set(val){
        emit('update:assets', val)
      }
    })

    const computedVariants = computed<Array<IVariant>>({
      get(){
        return props.variants!
      },
      set(val){
        emit('update:variants', toRaw(val))
      }
    })

    const computedSeoTitle = computed<string>({
      get(){
        return props.seo?.title
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.title = val
        emit('update:seo', seo)
      }
    })

    const computedSeoDesc = computed<string>({
      get(){
        return props.seo?.description
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.description = val

        emit('update:seo', seo)
      }
    })

    const computedSeoKeywords = computed<string>({
      get(){
        return props.seo?.keywords
      },
      set(val){
        const seo = JSON.parse(JSON.stringify(props.seo))
        seo.keywords = val

        emit('update:seo', seo)
      }
    })

    const computedVisibility = computed<boolean>({
      get(){
        return props.isVisible
      },
      set(val){
        emit('update:isVisible', val)
      }
    })

    const computedCategories = computed<Array<ICategory>>({
      get(){
        return props.categories!
      },
      set(val){
        emit('update:categories', val)
      }
    })

    const onImagesContextMenu = (event, asset) => {
      imagesContextMenu.show = true
      imagesContextMenu.positionX = event.clientX
      imagesContextMenu.positionY = event.clientY
      currentImage.value = clone(asset)
    }

    const toggleCategory = (ctg) => {
      if (ctgMap.value.get(ctg._id)) {
        ctgMap.value.delete(ctg._id)
      } else {
        ctgMap.value.set(ctg._id, ctg)
      }

      computedCategories.value = Array.from(toRaw(ctgMap.value).values())
    }

    const onCreate = validate => {
      validate().then(() => emit('create'))
    }

    const onAttributesUpdate = () => {
      emit('update:attributes', attributesArray.value)
    }

    const onUpdate = () => emit('update')

    const onSubmit = (validate) => {
      if (props.isUpdate) onUpdate()
      else onCreate(validate)
    }

    const onUpdateVariantImage = uploads => {
      if (!uploads.files.length) return

      emit('update:variant-image', uploads)
      productImages.value = []
    }

    const onLoadImage = uploads => {
      if (!uploads.length) return

      emit('upload:image', uploads)
      productImages.value = []
    }

    const onDeleteImage = (asset) => {
      emit('delete:image', asset.url)
    }

    const onDeleteAttribute = (attr) => {
      attributesArray.value = attributesArray.value.filter(it => it.key !== attr.key)
      emit('update:attributes', attributesArray.value)
    }

    const setAsMainImage = () => {
      computedImage.value = currentImage.value!.url

      computedAssets.value = clone(computedAssets.value).reduce((acc, it) => {
        it.main = it._id === currentImage.value!._id
        acc.push(it)
        return acc
      }, [] as any[]) as IProductAsset[]
    }

    const onClose = () => {
      emit('close', false)
    }

    const onDiscardChanges = () => {
      textEditorKey.value = props.description!
      emit('discard')
    }

    watch(() => props.modelValue, to => {
      ctgMap.value.clear()

      if (to && props.isUpdate) {
        props.categories?.forEach(ctg => {
          if (!ctgMap.value.get(ctg._id)) toggleCategory(ctg)
        })
      }

      attributesArray.value = clone(props.attributes)

      content.value = props.description!
      textEditorKey.value = content.value

    }, { immediate: true })

    return {
      ctgMap,
      computedVisibility,
      computedName,
      computedPrice,
      computedQuantity,
      computedUnit,
      computedImage,
      computedSeoTitle,
      computedSeoDesc,
      computedSeoKeywords,
      computedAssets,
      computedVariants,
      computedCategories,
      computedDescription,
      computedUrl,
      productImages,
      attributesArray,
      content,
      textEditorKey,
      imagesContextMenu,
      currentImage,
      toggleCategory,
      onImagesContextMenu,
      onLoadImage,
      onSubmit,
      onClose,
      onDiscardChanges,
      onDeleteImage,
      onAttributesUpdate,
      onDeleteAttribute,
      setAsMainImage,
      onUpdateVariantImage
    }
  }
})