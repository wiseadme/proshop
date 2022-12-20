<script setup lang="ts">
  import { PropType, watch } from 'vue'
  import { ICategory, ICategoryConditions } from '@ecommerce-platform/types'

  const {
    modelValue,
    isUpdate,
    title,
    url,
    image,
    parent,
    order,
    seoTitle,
    seoDescription,
    seoKeywords,
    conditions,
    categories
  } = defineProps({
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
    conditions: {
      type: Object as PropType<ICategoryConditions>,
      default: null
    },
    categories: {
      type: Array as PropType<Array<ICategory>>,
      default: null
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'update:title',
    'update:url',
    'update:image',
    'update:parent',
    'update:order',
    'update:seoTitle',
    'update:seoDescription',
    'update:seoKeywords',
    'update:conditions',
    'delete:image',
    'upload:image',
    'update',
    'create',
    'upload'
  ])

  const files = $ref<Maybe<any>>([])

  const computedTitleProp = $computed<string | undefined>({
    get: () => title,
    set: (val) => emit('update:title', val)
  })

  const computedUrlProp = $computed<string | undefined>({
    get: () => url,
    set: (val) => emit('update:url', val)
  })

  const computedImageProp = $computed<string | undefined>({
    get: () => image,
    set: (val) => emit('update:image', val)
  })

  const computedSeoTitleProp = $computed<string | undefined>({
    get: () => seoTitle,
    set: (val) => emit('update:seoTitle', val)
  })

  const computedSeoDescProp = $computed<string | undefined>({
    get: () => seoDescription,
    set: (val) => emit('update:seoDescription', val)
  })

  const computedSeoKeywordsProp = $computed<string | undefined>({
    get: () => seoKeywords,
    set: (val) => emit('update:seoKeywords', val)
  })

  const computedOrderProp = $computed<number | undefined>({
    get: () => order,
    set: (val) => emit('update:order', val)
  })

  const computedParentProp = $computed<Maybe<ICategory>>({
    get: () => {
      const id = isUpdate ? (parent as ICategory)?._id : parent
      return parent ? categories.find(it => it._id === id)! : null
    },
    set: (val: ICategory) => emit('update:parent', isUpdate ? val : val._id)
  })

  const computedConditionsProp = $computed<ICategoryConditions>({
    get: () => conditions,
    set: (val) => emit('update:conditions', val)
  })

  watch(() => image, () => files.value = [])

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
    if (isUpdate) {
      onUpdate(validate)
    }
    if (!isUpdate) {
      onCreate(validate)
    }
  }

  const onDeleteImage = () => {
    emit('delete:image', computedImageProp)
  }

  const onLoadImage = ([ file ]) => {
    if (!file) return
    emit('upload:image', file)
  }
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    width="70%"
    overlay
  >
    <v-form v-slot="{ validate }">
      <v-card
        class="elevation-3"
        width="100%"
        color="rgba(0,0,0,.4)"
      >
        <v-card-title
          class="card-title white--text text--base"
        >
          {{ isUpdate ? 'Обновление категории' : 'Создание категории' }}
        </v-card-title>
        <v-card-content
          class="grey lighten-4"
          style="height: 70vh; max-height: 70vh; overflow: auto"
        >
          <v-row class="white elevation-2 my-2 pa-2">
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedTitleProp"
                label="название"
              />
            </v-col>
            <v-col
              xl="6"
            >
              <v-text-field
                v-model.trim="computedUrlProp"
                label="url категории"
              />
            </v-col>
          </v-row>
          <v-row class="white elevation-2 my-2 pa-2">
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoTitleProp"
                label="seo title"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoDescProp"
                label="seo description"
              />
            </v-col>
          </v-row>
          <v-row class="white elevation-2 my-2 pa-2">
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoKeywordsProp"
                label="seo keywords"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.number="computedOrderProp"
                label="порядковый номер"
                type="number"
              />
            </v-col>
            <v-col xl="6">
              <v-select
                v-model="computedParentProp"
                label="Родительская категория"
                :items="categories"
                :disabled="categories && !categories.length"
                active-class="green white--text text--white"
                value-key="title"
              />
            </v-col>
            <v-col xl="6">
              <v-file-input
                v-model:value="files"
                label="загрузите изображения"
                chip-color="green"
                :disabled="!isUpdate || !!computedImageProp"
                @update:value="onLoadImage"
                @delete="onDeleteImage"
              />
            </v-col>
          </v-row>
          <v-row
            v-if="computedImageProp"
            class="white elevation-2 my-2 pa-2"
          >
            <v-col>
              <v-card
                color="white"
                width="200"
                style="position: relative"
                class="elevation-2"
              >
                <v-icon
                  style="position: absolute; right: 10px; top: 10px"
                  color="#272727"
                  clickable
                  @click="onDeleteImage(computedImageProp)"
                >
                  fas fa-times
                </v-icon>
                <v-card-content>
                  <img
                    style="width:100%"
                    :src="computedImageProp"
                  >
                </v-card-content>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox
                v-model="computedConditionsProp.visible"
                label="Категория отображаемая"
              />
              <v-checkbox
                v-model="computedConditionsProp.special"
                class="ml-2"
                label="Категория специальная"
              />
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-button
            color="green"
            elevation="3"
            width="120"
            @click="onSubmit(validate)"
          >
            сохранить
          </v-button>
          <v-button
            color="orange darken-1"
            class="ml-2"
            width="120"
            elevation="3"
            @click="$emit('update:modelValue', false)"
          >
            отмена
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-modal>
</template>
<style lang="scss">
  .card-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
</style>
