<script setup lang="ts">
  import { useMetaTagService } from '@modules/metatag/service/metatag.service'

  let metaProps = $ref({})

  const metaPropertyPattern = $ref({
    key: '',
    value: ''
  })

  const service = useMetaTagService()

  const clearMetaPattern = () => {
    metaPropertyPattern.key = ''
    metaPropertyPattern.value = ''
  }

  const addPropsToMeta = (validate) => {
    validate().then(() => {
      metaProps[metaPropertyPattern.key] = metaPropertyPattern.value
      clearMetaPattern()
    })
  }

  const saveMetaTagDescriptor = () => {
    service.createMetaTag(metaProps)
    clearMetaPattern()
    metaProps = {}
  }

  const displayMeta = $computed(() => {
    let tag = '<meta'
    let tagEnd = '/>'

    Object.keys(metaProps).forEach((it, i, arr) => {
      console.log(arr)
      // if (i % arr.length) {
      //   return
      // }

      tag += ` ${ it }="${ metaProps[it] }"`
    })

    tag += tagEnd

    return tag
  })

  service.fetchMetaTags().then(res => console.log(res))
</script>
<template>
  <div class="meta-tags-page">
    <v-layout>
      <v-row>
        <v-col>
          <v-form v-slot="{validate}">
            <v-card
              color="white"
              width="500"
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
                  label="Значение"
                />
              </v-card-content>
              <v-card-content>
                <!--                <pre>-->
                <code>
                  {{ displayMeta }}
                </code>
                <!--                </pre>-->
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
                  @click="addPropsToMeta(validate)"
                >
                  Сбросить ключи
                </v-button>
                <v-button
                  color="green"
                  elevation="2"
                  @click="saveMetaTagDescriptor()"
                >
                  Сохранить
                </v-button>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
