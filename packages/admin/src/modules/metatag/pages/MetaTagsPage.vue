<script setup lang="ts">
  import { watch, toRaw } from 'vue'
  import { useMetaTagService } from '@modules/metatag/service/metatag.service'
  import draggable from 'vuedraggable'
  import { IMetaTag } from '@ecommerce-platform/types'
  import { clone } from '@shared/helpers'

  const service = useMetaTagService()

  const metaProps = $ref({
    props: {},
    order: 0
  })

  const metaPropertyPattern = $ref({
    key: '',
    value: ''
  })

  let tags = $ref<Maybe<Array<IMetaTag>>>(null)
  let isEditMode = $ref(false)

  const clearMetaPattern = () => {
    metaPropertyPattern.key = ''
    metaPropertyPattern.value = ''
  }

  const clearAll = () => {
    clearMetaPattern()
    metaProps.props = {}
    metaProps.order = 0
  }

  const addPropsToMeta = (validate) => {
    validate().then(() => {
      const key = metaPropertyPattern.key.toLowerCase()

      metaProps.props[key] = metaPropertyPattern.value

      clearMetaPattern()
    })
  }

  const saveMetaTagDescriptor = async () => {
    const meta = toRaw(metaProps)

    if (isEditMode) {
      await service.updateMetaTag(meta)
      isEditMode = false
    } else {
      await service.createMetaTag(meta)
    }

    setTimeout(clearAll)
  }

  const onDelete = (el: IMetaTag) => {
    service.deleteMetaTag(el._id)
  }

  const descriptorToMetaTag = (descriptor) => {
    let tag = '<meta'
    let tagEnd = '/>'

    Object.keys(descriptor).forEach((it) => {
      tag += ` ${ it }="${ descriptor[it] }"`
    })

    tag += tagEnd

    return tag
  }

  const onEdit = (metaTagDescriptor) => {
    service.setAsCurrent(metaTagDescriptor)

    metaProps.props = clone(metaTagDescriptor.props)
    metaProps.order = metaTagDescriptor.order

    isEditMode = true
  }

  const displayMeta = $computed(() => descriptorToMetaTag(metaProps.props))
  const isDescriptorHasKeys = $computed(() => Object.keys(metaProps.props).length)
  const saveBtnTitle = $computed(() => isEditMode ? 'Изменить' : 'Сохранить')

  service.fetchMetaTags().then(res => console.log(res))

  watch(() => service.metaTags, (metaTags) => {
    tags = metaTags
  }, { immediate: true })

</script>
<template>
  <div class="meta-tags-page">
    <v-layout>
      <v-row>
        <v-col
          xl="4"
          lg="6"
          md="12"
          sm="12"
        >
          <v-form v-slot="{validate}">
            <v-card
              color="white"
              width="100%"
              class="elevation-2"
            >
              <v-card-title class="primary--text">
                <h3>Свойства мета тега</h3>
              </v-card-title>
              <v-card-content>
                <v-text-field
                  v-model="metaPropertyPattern.key"
                  :rules="[val => !!val || 'Обязательное поле']"
                  label="Ключ"
                />
                <v-text-field
                  v-model="metaPropertyPattern.value"
                  label="Значение по умолчанию"
                />
              </v-card-content>
              <v-card-content>
                <code>
                  {{ displayMeta }}
                </code>
              </v-card-content>
              <v-card-content>
                <v-text-field
                  v-model="metaProps.order"
                  type="number"
                  label="Порядковый номер мета тега"
                />
              </v-card-content>
              <v-card-actions>
                <v-button
                  color="green"
                  class="mr-2"
                  text
                  @click="addPropsToMeta(validate)"
                >
                  Добавить ключ
                </v-button>
                <v-button
                  color="orange"
                  class="mr-2"
                  text
                  @click="clearAll"
                >
                  Сбросить ключи
                </v-button>
                <v-button
                  color="green"
                  elevation="2"
                  :disabled="!isDescriptorHasKeys"
                  @click="saveMetaTagDescriptor()"
                >
                  {{ saveBtnTitle }}
                </v-button>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-col
          xl="8"
          lg="6"
          md="12"
          sm="12"
        >
          <template v-if="service.metaTags">
            <draggable
              v-model="tags"
              item-key="_id"
            >
              <template #item="{element}">
                <div
                  class="d-flex justify-start align-center elevation-2 my-1 py-4 px-3 meta-tag-item white"
                  @click="onEdit(element)"
                >
                  <v-icon
                    class="mr-3"
                    color="grey lighten-2"
                  >
                    fas fa-grip-vertical
                  </v-icon>
                  <span>
                    {{ descriptorToMetaTag(element.props) }}
                  </span>
                  <v-spacer></v-spacer>
                  <v-icon
                    clickable
                    color="green"
                    @click="onDelete(element)"
                  >
                    fas fa-times
                  </v-icon>
                </div>
              </template>
            </draggable>
          </template>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
<style lang="scss">
  .meta-tag-item {
    cursor: pointer;

    &:active {
      box-shadow: none !important;
    }
  }
</style>
