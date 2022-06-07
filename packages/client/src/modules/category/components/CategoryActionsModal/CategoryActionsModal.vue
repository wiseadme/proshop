<script lang="ts">
  import { categoryActionsModal } from './category-actions-modal'

  export default categoryActionsModal
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
        class="elevation-3"
        width="100%"
        color="#272727"
      >
        <v-card-title
          class="card-title green--text text--base"
        >
          {{ isUpdate ? 'Обновление категории': 'Создание категории' }}
        </v-card-title>
        <v-card-content
          class="grey lighten-3"
          style="height: 70vh; max-height: 70vh; overflow: auto"
        >
          <v-row>
            <v-col
              xl="6"
            >
              <v-text-field
                v-model="computedTitleProp"
                label="название"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col
              xl="6"
            >
              <v-text-field
                v-model="computedUrlProp"
                label="url категории"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="6">
              <v-text-field
                v-model="computedSeoTitleProp"
                label="seo title"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model="computedSeoDescProp"
                label="seo description"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="6">
              <v-text-field
                v-model="computedSeoKeywordsProp"
                label="seo keywords"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.number="computedOrderProp"
                label="порядковый номер"
                color="#272727"
                text-color="#272727"
                type="number"
              />
            </v-col>
            <v-col xl="6">
              <v-select
                v-model="computedParentProp"
                label="Родительская категория"
                :items="categories"
                :disabled="categories && !categories.length"
                color="#272727"
                active-class="green white--text text--white"
                text-color="#272727"
                value-key="title"
              />
            </v-col>
            <v-col xl="6">
              <v-file-input
                v-model:value="files"
                label="загрузите изображения"
                color="#272727"
                text-color="#272727"
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
                    :src="'http://anar.com' + computedImageProp"
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
            color="white"
            elevation="3"
            width="120"
            outlined
            @click="onSubmit(validate)"
          >
            сохранить
          </v-button>
          <v-button
            color="warning"
            class="ml-4"
            width="120"
            elevation="3"
            outlined
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
