<script lang="ts" setup>
  import { useProductAttributes } from '@modules/product/composables/use-product-attributes'
  import { useProduct } from '@modules/product/composables/use-product'
  // @ts-ignore
  import draggable from 'vuedraggable'

  const { model } = useProduct()

  const {
    availableAttributes,
    onUpdateAttributes,
  } = useProductAttributes()

  const pullFunction = () => {
  }

  const onChange = () => {
  }
</script>
<template>
  <v-row class="pa-4 elevation-2 app-border-radius">
    <v-col class="block-head pb-6 mb-8">
      <h2 class="block-head__title">
        Атрибуты
      </h2>
    </v-col>
    <v-col cols="6">
      <div class="used-attributes">
        <h3 class="grey--text text--lighten-1">
          Текущие атрибуты
        </h3>
        <draggable
          :list="model.attributes"
          item-key="key"
          group="attributes"
          class="draggable-container"
          @change="onChange"
        >
          <template #item="{element}">
            <v-row class="my-2 pa-2 attribute app-border-radius">
              <v-col class="d-flex">
                <v-icon
                  class="mr-3"
                  color="primary"
                >
                  fas fa-grip-vertical
                </v-icon>
                <v-text-field
                  v-model="element.value"
                  :label="element.key"
                  @input="onUpdateAttributes"
                />
              </v-col>
            </v-row>
          </template>
        </draggable>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="attributes-list">
        <h3 class="grey--text text--lighten-1">
          Список атрибутов
        </h3>
        <draggable
          :list="availableAttributes"
          item-key="key"
          :group="{ name: 'attributes', pull: pullFunction }"
          class="draggable-container"
          @change="onChange"
        >
          <template #item="{element}">
            <v-row class="my-2 pa-2 attribute app-border-radius">
              <v-col class="d-flex">
                <v-icon
                  class="mr-3"
                  color="grey lighten-2"
                >
                  fas fa-grip-vertical
                </v-icon>
                <v-text-field
                  v-model="element.value"
                  :label="element.key"
                  @input="onUpdateAttributes"
                />
              </v-col>
            </v-row>
          </template>
        </draggable>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
  .draggable-container {
    min-height: 100px;
    border-radius: 10px;
    overflow: hidden !important;
  }
  .attribute {
    overflow: hidden;
    cursor: pointer;
    border: 1px dotted #dcdcdc !important;
  }

  .sortable-ghost {
    opacity: .3;
  }
</style>
