<script lang="ts">
  import { defineComponent } from 'vue'
  import draggable from 'vuedraggable'
  import { useProductAttributes } from '@modules/product/composables/use-product-attributes'

  export default defineComponent({
    name: 'attributes-block',
    components: { draggable },
    setup() {
      const {
        attributes,
        availableAttributes,
        usedAttributes,
        onUpdateAttributes,
        onDeleteAttribute
      } = useProductAttributes()

      const pullFunction = () => {}
      const onChange = (val) => console.log(val)

      return {
        attributes,
        availableAttributes,
        usedAttributes,
        onUpdateAttributes,
        onDeleteAttribute,
        pullFunction,
        onChange,
      }
    }
  })
</script>
<template>
  <v-row no-gutter>
    <v-col class="white mt-2 elevation-2">
      <v-card
        width="100%"
      >
        <v-card-title>
          <h3 class="primary--text">
            Атрибуты
          </h3>
        </v-card-title>
        <v-card-content>
          <div class="used-attributes">
            <h3 class="grey--text text--lighten-1">
              Текущие атрибуты
            </h3>
            <draggable
              :list="usedAttributes"
              item-key="key"
              group="attributes"
              class="draggable-container elevation-2"
              @change="onChange"
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
                      @input="onUpdateAttributes"
                    />
                  </v-col>
                </v-row>
              </template>
            </draggable>
          </div>
          <div class="attributes-list mt-4">
            <h3 class="grey--text text--lighten-1">
              Список атрибутов
            </h3>
            <draggable
              :list="availableAttributes"
              item-key="key"
              :group="{ name: 'attributes', pull: pullFunction }"
              class="draggable-container elevation-2"
              @change="onChange"
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
                      @input="onUpdateAttributes"
                    />
                  </v-col>
                </v-row>
              </template>
            </draggable>
          </div>
        </v-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss">
  .draggable-container {
    min-height: 120px;
    border-radius: 5px;
    overflow: hidden !important;
  }
</style>
