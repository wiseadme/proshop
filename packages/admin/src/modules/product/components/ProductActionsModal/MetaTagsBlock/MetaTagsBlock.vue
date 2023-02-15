<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { descriptorToMetaTag } from '@shared/helpers/metatag'
  import { IMetaTag } from '@ecommerce-platform/types'
  import { clone } from '@shared/helpers'

  const props = defineProps({
    metaTags: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  })

  const availableTags = $ref<Array<IMetaTag>>(clone(props.items))
  const alreadyExistsTags = $ref(clone(props.metaTags))

  const onEdit = (tag) => {
    console.log(tag)
  }

  const onChange = () => {
    // console.log(tag)
    console.log(availableTags, alreadyExistsTags)
  }

  const pullFunction = () => {
    console.log('ev')
  }

</script>
<template>
  <v-layout>
    <v-row>
      <v-col class="white mt-2 elevation-2">
        <v-card width="100%">
          <v-card-title>
            <h3 class="primary--text">
              Мета теги
            </h3>
          </v-card-title>
          <v-card-content>
            <div
              class="exists-meta-tags"
            >
              <h3 class="py-2 meta-tags-head grey--text text--lighten-1">
                Текущие мета теги товара
              </h3>
              <draggable
                :list="alreadyExistsTags"
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
                :list="availableTags"
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
  </v-layout>
</template>
<style lang="scss">
  .draggable-container {
    min-height: 50px;
    border-radius: 5px;
    overflow: hidden !important;
  }
  //.exists-tags {
  //  border: 1px solid #d3d3d3;
  //}
  //.available-tags {
  //  border: 1px solid #d3d3d3;
  //}
</style>
