<script lang="ts" setup>
  import { ref, unref } from 'vue'
  import { useVariantsService } from '@modules/variant/composables/use-variants-service'
  import { Variant } from '@modules/variant/model/variant.model'
  import { IVariant } from '@ecommerce-platform/types'
  // @ts-ignore
  import draggable from 'vuedraggable'

  const { getVariants, createVariant, deleteVariant, variants } = useVariantsService()

  const model = ref<IVariant>(Variant.create())

  const onCreate = (validate) => {
    validate()
      .then(() => createVariant(unref(model)))
      .then(clearForm)
  }

  const onDelete = (item) => {
    return deleteVariant(item._id)
  }

  const clearForm = () => {
    model.value = Variant.create()
  }

  const onChange = () => {
    console.log('change')
  }

  getVariants()
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
            class="app-border-radius"
          >
            <v-card-title class="primary--text">
              <h3>Группы вариантов</h3>
            </v-card-title>
            <v-card-content>
              <v-text-field
                v-model.trim="model.group"
                label="Название группы"
                color="content"
                :rules="[val => !!val || 'Обязательное поле']"
              />
            </v-card-content>
            <v-card-actions class="">
              <v-button
                elevation="2"
                color="primary"
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
        <template v-if="variants">
          <draggable
            v-model="variants"
            item-key="_id"
            @change="onChange"
          >
            <template #item="{element}">
              <div
                class="d-flex justify-start align-center elevation-2 my-1 py-2 px-3 white"
              >
                <v-icon
                  class="mr-3"
                  color="grey lighten-2"
                >
                  fas fa-grip-vertical
                </v-icon>
                <span>
                  {{ element.group }}
                </span>
                <v-spacer></v-spacer>
                <v-button
                  color="error"
                  elevation="2"
                  round
                  @click="onDelete(element)"
                >
                  <v-icon>
                    fas fa-times
                  </v-icon>
                </v-button>
              </div>
            </template>
          </draggable>
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>
