<script lang="ts">
  import { defineComponent } from 'vue'
  import draggable from 'vuedraggable'
  import MetaTagEditForm from './MetaTagsEditForm.vue'
  import { useProductMetaTags } from '@modules/product/composables/use-product-metatags'
  import { useProduct } from '@modules/product/composables/use-product'
  // Helpers
  import { descriptorToMetaTag } from '@shared/helpers/metatag'

  export default defineComponent({
    name: 'product-meta-tags-block',
    components: {
      draggable,
      MetaTagEditForm
    },
    emits: [ 'update:meta-tags' ],
    setup() {
      const { model } = useProduct()
      const {
        availableMetaTags,
        metaTag,
        editTag
      } = useProductMetaTags()

      const onChange = () => {
      }
      const pullFunction = () => {
      }

      return {
        model,
        metaTag,
        availableMetaTags,
        editTag,
        onChange,
        pullFunction,
        descriptorToMetaTag
      }
    }
  })
</script>
<template>
  <v-row class="white elevation-2 mt-2 pa-4 app-border-radius">
    <v-col class="block-head pb-6 mb-8">
      <h2 class="block-head__title">
        Мета теги
      </h2>
    </v-col>
    <v-col
      cols="6"
      class="px-2"
    >
      <div class="used-tags">
        <h3 class="py-2 meta-tags-head grey--text text--lighten-1">
          Текущие мета теги товара
        </h3>
        <draggable
          :list="model.seo.metatags"
          item-key="_id"
          group="metaTags"
          class="draggable-container exists-tags"
          @change="onChange"
        >
          <template #item="{element}">
            <div
              v-if="element !== metaTag"
              class="d-flex justify-start align-center elevation-2 my-1 mx-1 py-4 px-3 meta-tag-item primary"
              style="border-radius: 10px; overflow: hidden"
              @click="editTag(element)"
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
            <meta-tag-edit-form v-else/>
          </template>
        </draggable>
      </div>
    </v-col>
    <v-col
      cols="6"
      class="px-2"
    >
      <div class="available-tags">
        <h3 class="meta-tags-head py-2 grey--text text--lighten-1">
          Список мета тегов
        </h3>
        <draggable
          :list="availableMetaTags"
          item-key="_id"
          :group="{ name: 'metaTags', pull: pullFunction }"
          class="draggable-container"
          @dragend="onChange"
          @change="onChange"
        >
          <template #item="{element}">
            <div
              class="d-flex justify-start align-center elevation-2 my-1 mx-1 py-4 px-3 meta-tag-item white"
              style="border-radius: 10px; overflow: hidden"
              @click="editTag(element)"
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
    </v-col>
  </v-row>
</template>
<style lang="scss">
  .draggable-container {
    min-height: 100px;
    border-radius: 10px;
    border: 1px dotted #dcdcdc;
    overflow: hidden !important;
  }

  .available-tags,
  .used-tags {
  }
</style>
