<script lang="ts">
  import { CategoryActionsModal } from './category-actions-modal'

  export default CategoryActionsModal
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
        v-click-outside="{handler: () => $emit('update:modelValue', false)}"
        class="elevation-3"
        width="100%"
        color="#fefefe"
      >
        <v-card-title
          class="card-title green--text text--base"
        >
          {{ isUpdate ? 'Обновление категории': 'Создание категории' }}
        </v-card-title>
        <v-card-content
          style="height: 70vh; max-height: 70vh; overflow: auto"
        >
          <v-row>
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
          <v-row>
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
          <v-row>
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
          <v-row v-if="computedImageProp">
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
                v-model="computedIsVisibleProp"
                label="Категория отображаемая"
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
