<script lang="ts">
  import { defineComponent } from 'vue'
  import draggable from 'vuedraggable'
  import { useProductMetatags } from '@modules/product/composables/use-product-metatags'
  // Helpers
  import { descriptorToMetaTag } from '@shared/helpers/metatag'

  export default defineComponent({
    name: 'meta-tags-block',
    components: { draggable },
    emits: [ 'update:meta-tags' ],
    setup() {
      const { usedMetaTags, availableMetaTags } = useProductMetatags()

      const onEdit = (tag) => console.log(tag)
      const onChange = () => console.log('change')
      const pullFunction = () => console.log('ev')

      return {
        usedMetaTags,
        availableMetaTags,
        onEdit,
        onChange,
        pullFunction,
        descriptorToMetaTag
      }
    }
  })
</script>
<template>
  <v-row
    no-gutter
    class="white elevation-2 mt-2"
  >
    <v-col>
      <v-card width="100%">
        <v-card-title>
          <h3 class="primary--text">
            Мета теги
          </h3>
        </v-card-title>
        <v-card-content>
          <div
            class="used-meta-tags"
          >
            <h3 class="py-2 meta-tags-head grey--text text--lighten-1">
              Текущие мета теги товара
            </h3>
            <draggable
              :list="usedMetaTags"
              item-key="_id"
              group="metaTags"
              class="draggable-container exists-tags elevation-2"
              @change="onChange"
            >
              <template #item="{element}">
                <div
                  class="d-flex justify-start align-center elevation-2 my-1 py-4 px-3 meta-tag-item primary"
                  @click="onEdit(element)"
                >
                  <v-icon
                    class="mr-3"
                    color="grey lighten-2"
                  >
                    fas fa-grip-vertical
                  </v-icon>
                  <span class="white--text">
                    {{ descriptorToMetaTag(element.props) }}
                  </span>
                  <v-spacer></v-spacer>
                </div>
              </template>
            </draggable>
          </div>
          <div class="available-meta-tags available-tags mt-4">
            <h3 class="meta-tags-head py-2 grey--text text--lighten-1">
              Список мета тегов
            </h3>
            <draggable
              :list="availableMetaTags"
              item-key="_id"
              :group="{ name: 'metaTags', pull: pullFunction }"
              class="draggable-container elevation-2"
              @dragend="onChange"
              @change="onChange"
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
                </div>
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
    min-height: 50px;
    border-radius: 5px;
    overflow: hidden !important;
  }
</style>
