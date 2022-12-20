<script lang="ts" setup>
  import { watch, toRaw } from 'vue'
  // Service
  import { useAttributeService } from '@modules/attribute/service/attribute.service'
  // Components
  import draggable from 'vuedraggable'
  // Types
  import { Attribute } from '@modules/attribute/model/attribute.model'
  // Helpers
  import { clone } from '@shared/helpers'
  import { IAttribute } from '@ecommerce-platform/types'

  let attributes = $ref<Maybe<Array<IAttribute>>>(null)
  let attributePattern = $ref<IAttribute>(Attribute.create())

  const service = useAttributeService()

  const clearForm = () => {
    attributePattern = Attribute.create()
  }

  const onCreate = (validate) => {
    validate().then(() => {
      service.createAttribute(toRaw(attributePattern))
    })
  }

  const onChange = () => {
    attributes!.forEach((it, i) => it.order = i)
    service.updateAttribute(attributes)
  }

  const onDelete = (attribute: IAttribute) => {
    service.deleteAttribute(attribute._id)
  }

  watch(
    () => service.attributes,
    to => attributes = clone(to),
    { immediate: true, deep: true }
  )

  service.getAttributes()
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col
        xl="4"
        lg="6"
        md="12"
        sm="12"
      >
        <v-form v-slot="{validate}">
          <v-card
            width="100%"
            elevation="2"
            color="white"
          >
            <v-card-title class="green--text">
              <h3>Аттрибуты</h3>
            </v-card-title>
            <v-card-content>
              <v-text-field
                v-model="attributePattern.key"
                label="Название*"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="attributePattern.value"
                label="Значение по умолчанию*"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="attributePattern.meta"
                label="Мета информация"
              />
              <v-text-field
                v-model="attributePattern.order"
                label="Порядковый номер"
                type="number"
              />
            </v-card-content>
            <v-card-actions class="">
              <v-button
                elevation="2"
                color="green"
                @click="onCreate(validate)"
              >
                <v-icon
                  size="14"
                >
                  fas fa-plus
                </v-icon>
              </v-button>
              <v-button
                elevation="2"
                color="error"
                class="ml-2"
                @click="clearForm"
              >
                <v-icon
                  size="14"
                >
                  fas fa-trash-alt
                </v-icon>
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
        <template v-if="attributes">
          <draggable
            v-model="attributes"
            item-key="_id"
            @change="onChange"
          >
            <template #item="{element}">
              <div
                class="d-flex justify-start align-center elevation-2 my-1 py-4 px-3 attribute-item white"
              >
                <v-icon
                  class="mr-3"
                  color="grey lighten-2"
                >
                  fas fa-grip-vertical
                </v-icon>
                <span>
                  {{ element.key }}
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
</template>
<style lang="scss">
  @import "./AttributePage";
</style>
