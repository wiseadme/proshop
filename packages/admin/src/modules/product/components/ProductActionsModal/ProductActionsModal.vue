<script lang="ts" setup>
  import { PropType, nextTick, toRaw, watch } from 'vue'
  import { IVariant, ICategory, IAsset, IUnit, IAttribute, IProductConditions } from '@ecommerce-platform/types/index'
  import { clone } from '@shared/helpers'
  import { TextEditor } from '@shared/components/TextEditor'
  import VariantsBlock from './VariantsBlock'
  import ConditionsBlock from './ConditionsBlock'
  import draggable from 'vuedraggable'

  const props = defineProps({
    modelValue: Boolean,
    isEditMode: Boolean,
    hasChanges: Boolean,
    conditions: Object as PropType<IProductConditions>,
    categoryItems: Array as PropType<Array<ICategory>>,
    unitItems: Array as PropType<Array<IUnit>>,
    variantItems: Array as PropType<Array<IVariant>>,
    name: String,
    url: String,
    description: String,
    price: Number,
    quantity: Number,
    unit: Object as PropType<IUnit>,
    image: String,
    seo: Object,
    categories: Array as PropType<Array<ICategory>>,
    attributes: Array as PropType<Array<IAttribute>>,
    variants: Array as PropType<Array<IVariant>>,
    assets: Array as PropType<Array<IAsset>>
  })

  const emit = defineEmits([
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
    'update:seo:title',
    'update:seo:description',
    'update:seo:keywords',
    'update:conditions',
    'update:url',
    'upload:image',
    'delete:image',
    'upload:variant-image',
    'delete:variant-image',
    'create:variant-option',
    'delete:variant-option',
    'update:variant-option',
    'create',
    'discard',
    'update'
  ])

  const ctgMap = $ref<Map<string, ICategory>>(new Map())
  const imagesContextMenu = $ref({
    show: false,
    positionX: 0,
    positionY: 0,
  })

  let productImages = $ref<Array<File>>([])
  let attributesArray = $ref<Array<IAttribute>>([])
  let currentImage = $ref<Maybe<IAsset>>(null)
  let content = $ref<string>('')
  let rerenderKey = $ref<string>('')

  const computedModalHeader = $computed<string>(() => {
    return `${ (props.isEditMode ? 'Редактирование' : 'Создание') } продукта`
  })

  const computedModelValue = $computed<boolean>({
    get: () => props.modelValue!,
    set: (val) => emit('update:modelValue', val)
  })

  const computedName = $computed<string>({
    get: () => props.name!,
    set: (val) => emit('update:name', val)
  })

  const computedPrice = $computed<number>({
    get: () => props.price!,
    set: (val) => emit('update:price', +val)
  })

  let computedDescription = $computed<string>({
    get: () => content!,
    set: (val) => emit('update:description', val)
  })

  let computedUnit = $computed<IUnit>({
    get: () => props.unit!,
    set: (val) => emit('update:unit', val)
  })

  let computedQuantity = $computed<number>({
    get: () => props.quantity!,
    set: (val) => emit('update:quantity', +val)
  })

  let computedUrl = $computed<string>({
    get: () => props.url!,
    set: (val) => emit('update:url', val)
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let computedImage = $computed<string>({
    get: () => props.image!,
    set: (val) => emit('update:image', val)
  })

  let computedAssets = $computed<Array<IAsset>>({
    get: () => props.assets!,
    set: (val) => emit('update:assets', val)
  })

  let computedVariants = $computed<Array<IVariant>>({
    get: () => props.variants!,
    set: (val) => emit('update:variants', toRaw(val))
  })

  let computedSeoTitle = $computed<string>({
    get: () => props.seo?.title,
    set: (val) => {
      const seo = JSON.parse(JSON.stringify(props.seo))
      seo.title = val
      emit('update:seo', seo)
    }
  })

  let computedSeoDesc = $computed<string>({
    get: () => props.seo?.description,
    set: (val) => {
      const seo = JSON.parse(JSON.stringify(props.seo))
      seo.description = val

      emit('update:seo', seo)
    }
  })

  let computedSeoKeywords = $computed<string>({
    get: () => props.seo?.keywords,
    set: (val) => {
      const seo = JSON.parse(JSON.stringify(props.seo))
      seo.keywords = val

      emit('update:seo', seo)
    }
  })

  let computedConditions = $computed<IProductConditions>({
    get: () => props.conditions!,
    set: (val) => emit('update:conditions', val)
  })

  let computedCategories = $computed<Array<ICategory>>({
    get: () => props.categories!,
    set: (val) => emit('update:categories', val)
  })

  const onImagesContextMenu = (event, asset) => {
    imagesContextMenu.show = true
    imagesContextMenu.positionX = event.clientX
    imagesContextMenu.positionY = event.clientY
    currentImage = clone(asset)
  }

  const toggleCategory = (ctg) => {
    if (ctgMap.get(ctg._id)) {
      ctgMap.delete(ctg._id)
    } else {
      ctgMap.set(ctg._id, ctg)
    }

    computedCategories = Array.from(
      toRaw(ctgMap).values()
    )
  }

  const onCreate = validate => {
    validate().then(() => emit('create'))
  }

  const onAttributesUpdate = () => {
    emit('update:attributes', attributesArray)
  }

  const onUpdate = () => emit('update')

  const onSubmit = (validate) => {
    if (props.isEditMode) onUpdate()
    else onCreate(validate)
  }

  const onCreateVariantOption = (option) => {
    emit('create:variant-option', option)
  }

  const onUpdateVariantOption = (option) => {
    emit('update:variant-option', option)
  }

  const onDeleteVariantOption = ({ variant, option }) => {
    emit('delete:variant-option', { variant, option })
  }

  const onUploadVariantImage = ({ file, option }) => {
    if (!file) return

    emit('upload:variant-image', { file, option })
    productImages = []
  }

  const onDeleteVariantImage = ({ asset, option, variant }) => {
    emit('delete:variant-image', { asset, option, variant })
  }

  const onLoadImage = ([ file ]) => {
    if (!file) {
      return
    }

    emit('upload:image', file)
    productImages = []
  }

  const onDeleteImage = (asset) => {
    emit('delete:image', asset)
  }

  const onDeleteAttribute = (attr) => {
    attributesArray = attributesArray.filter(it => it.key !== attr.key)
    emit('update:attributes', attributesArray)
  }

  const setAsMainImage = () => {
    computedImage = currentImage!.url

    computedAssets = clone(computedAssets).reduce((acc, it) => {
      it.main = it._id === currentImage!._id
      acc.push(it)
      return acc
    }, [] as any[]) as IAsset[]
  }

  const onClose = () => {
    emit('update:modelValue', false)
  }

  const onDiscardChanges = () => {
    rerenderKey = `${ Date.now() }`

    nextTick(() => {
      ctgMap.clear()
      computedCategories?.forEach(toggleCategory)
      attributesArray = clone(props.attributes)
    })

    emit('discard')
  }

  watch(() => props.modelValue, to => {
    ctgMap.clear()

    if (to && props.isEditMode) {
      props.categories!.forEach(ctg => {
        if (!ctgMap.get(ctg._id!)) {
          toggleCategory(ctg)
        }
      })
    }

    attributesArray = clone(props.attributes)

    content = props.description!
    rerenderKey = content

  }, { immediate: true })
</script>
<template>
  <div>
    <v-modal
      v-model="computedModelValue"
      transition="scale-in"
      width="90%"
      overlay
    >
      <v-form v-slot="{validate}">
        <v-card
          color="rgba(0,0,0,.4)"
          width="100%"
          class="elevation-5"
        >
          <v-card-title class="white--text text--base">
            <h3>{{ computedModalHeader }}</h3>
          </v-card-title>
          <v-card-content
            class="grey lighten-3"
            width="100%"
            style="height: 80vh; max-height: 80vh; overflow: auto"
          >
            <v-row class="white my-4 pa-4 elevation-2">
              <v-col xl="6">
                <v-text-field
                  v-model.trim="computedName"
                  label="Наименование товара"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.number="computedPrice"
                  label="Цена"
                  color="#272727"
                  text-color="#272727"
                  type="number"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.number="computedQuantity"
                  label="Количество"
                  color="#272727"
                  type="number"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-select
                  v-model="computedUnit"
                  :items="unitItems"
                  label="Единица измерения"
                  color="#272727"
                  value-key="value"
                  active-class="green white--text"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.trim="computedSeoTitle"
                  label="SEO title"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.trim="computedSeoDesc"
                  label="SEO description"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.trim="computedSeoKeywords"
                  label="SEO keywords"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.trim="computedUrl"
                  label="URL товара"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
            </v-row>
            <v-row no-gutter>
              <v-col class="mb-4 pa-4 white elevation-2">
                <v-file-input
                  :value="productImages"
                  :label="isEditMode ? 'Загрузить изображения' : 'Загрузить изображение можно только после создания продукта'"
                  color="#272727"
                  text-color="#272727"
                  :disabled="!isEditMode"
                  @update:value="onLoadImage"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="it in computedAssets"
                :key="it._id"
                xl="2"
                lg="4"
                md="6"
                sm="12"
                class="image mb-4 mr-1 pa-2 white elevation-2 d-flex justify-center align-center"
                :class="{'product-image--main': it.main}"
                style="height: 250px; overflow: hidden; position: relative"
                @contextmenu.prevent="onImagesContextMenu($event, it)"
              >
                <img
                  style="height: auto; width: 100%"
                  :src="it.url"
                  class=""
                  alt=""
                >
                <v-icon
                  clickable
                  style="position: absolute; top: 5px; right: 5px"
                  @click="onDeleteImage(it)"
                >
                  fas fa-times
                </v-icon>
              </v-col>
              <v-menu
                v-model="imagesContextMenu.show"
                :position-x="imagesContextMenu.positionX"
                :position-y="imagesContextMenu.positionY"
                width="200"
                absolute
                open-on-click
                @hide="imagesContextMenu.show = false"
              >
                <v-list
                  class="images-menu white"
                >
                  <v-list-item
                    class="images-menu__item"
                    @click="setAsMainImage"
                  >
                    <v-list-item-title>
                      установить главным
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    class="images-menu__item"
                    @click="onDeleteImage(currentImage)"
                  >
                    <v-list-item-title>
                      удалить
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
            <v-row>
              <v-col class="elevation-2 white mb-4">
                <v-card width="100%">
                  <v-card-title class="green--text">
                    <h3>Описание товара</h3>
                  </v-card-title>
                  <v-card-content>
                    <text-editor
                      :key="rerenderKey"
                      v-model:content="computedDescription"
                      content-type="html"
                      :global-options="{
                        placeholder: 'введите описание товара'
                      }"
                    />
                  </v-card-content>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutter>
              <v-col
                xl="12"
                class="elevation-2 pt-2 white"
              >
                <v-card width="100%">
                  <v-card-title>
                    <h3>
                      Категории
                    </h3>
                  </v-card-title>
                  <v-card-content>
                    <template
                      v-for="it in categoryItems"
                      :key="it._id"
                    >
                      <v-group
                        v-if="it.children && it.children.length"
                        :title="it.title"
                        class="elevation-2"
                        :expand="isEditMode"
                      >
                        <v-list>
                          <v-list-item
                            v-for="c in it.children"
                            :key="c._id"
                            :class="[{'green white--text text--base': ctgMap.get(c._id)}]"
                            @click="toggleCategory(c)"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ c.title }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-group>
                      <v-list
                        v-else-if="!it.parent && !it.children.length"
                        class="elevation-2"
                      >
                        <v-list-item
                          :class="[{'green white--text text--base': ctgMap.get(it._id)}]"
                          @click="toggleCategory(it)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ it.title }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-card-content>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutter>
              <v-col class="white mt-2 elevation-2">
                <v-card
                  width="100%"
                >
                  <v-card-title>
                    <h3>Атрибуты</h3>
                  </v-card-title>
                  <v-card-content>
                    <draggable
                      v-model="attributesArray"
                      item-key="_id"
                      @change="onAttributesUpdate"
                    >
                      <template #item="{element}">
                        <v-row class="my-2 elevation-2 pa-2 attribute">
                          <v-col
                            class="d-flex justify-start align-center"
                            cols="6"
                          >
                            <v-icon
                              class="mr-3"
                              color="grey lighten-2"
                            >
                              fas fa-grip-vertical
                            </v-icon>
                            <div class="attr-title py-2">
                              {{ element.key }}
                            </div>
                            <v-spacer
                              class="mx-2"
                              style="border-bottom: 1px dotted #272727"
                            >
                            </v-spacer>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="element.value"
                              color="#272727"
                              @input="onAttributesUpdate"
                            />
                            <v-icon
                              class="mr-3"
                              color="grey lighten-2"
                              clickable
                              style="position: absolute; top: 0; right: 0"
                              @click="onDeleteAttribute(element)"
                            >
                              fas fa-trash-alt
                            </v-icon>
                          </v-col>
                        </v-row>
                      </template>
                    </draggable>
                  </v-card-content>
                </v-card>
              </v-col>
            </v-row>
            <variants-block
              v-model:variants="computedVariants"
              :is-displayed="modelValue"
              :is-edit="isEditMode"
              :variant-items="variantItems"
              @upload:variant-image="onUploadVariantImage"
              @delete:variant-image="onDeleteVariantImage"
              @create:variant-option="onCreateVariantOption"
              @delete:variant-option="onDeleteVariantOption"
              @update:variant-option="onUpdateVariantOption"
            />
            <conditions-block
              v-model:conditions="computedConditions"
              class="my-4"
            />
          </v-card-content>
          <v-card-actions>
            <v-button
              color="green"
              elevation="3"
              width="120"
              :disabled="!hasChanges && isEditMode"
              @click="onSubmit(validate)"
            >
              сохранить
            </v-button>
            <v-button
              color="orange accent-2"
              class="ml-4"
              width="120"
              elevation="3"
              :disabled="hasChanges"
              @click="onClose"
            >
              отмена
            </v-button>
            <v-button
              v-if="isEditMode"
              class="ml-4"
              elevation="3"
              color="red darken-2"
              :disabled="!hasChanges"
              @click="onDiscardChanges"
            >
              сбросить изменения
            </v-button>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-modal>
  </div>
</template>
<style lang="scss">
  @import "ProductActionsModal";
</style>
