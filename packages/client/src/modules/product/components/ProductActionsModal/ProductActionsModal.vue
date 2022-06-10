<script lang="ts">
  import { productActionsModal } from './product-actions-modal'

  export default productActionsModal
</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    width="90%"
    overlay
  >
    <v-form v-slot="{validate}">
      <v-card
        color="#272727"
        width="100%"
        class="elevation-5"
      >
        <v-card-title class="green--text text--base">
          <h3>Создание продукта</h3>
        </v-card-title>
        <v-card-content
          class="grey lighten-3"
          width="100%"
          style="height: 80vh; max-height: 80vh; overflow: auto"
        >
          <v-row class="white my-4 pa-4 elevation-2">
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedName"
                label="Наименование товара"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.number="computedPrice"
                label="Цена"
                color="#272727"
                text-color="#272727"
                type="number"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.number="computedCount"
                label="Количество"
                color="#272727"
                type="number"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-select
                v-model="computedUnit"
                :items="unitItems"
                label="Единица измерения"
                color="#272727"
                value-key="value"
                active-class="green white--text"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoTitle"
                label="SEO title"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoDesc"
                label="SEO description"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedSeoKeywords"
                label="SEO keywords"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
            <v-col xl="6">
              <v-text-field
                v-model.trim="computedUrl"
                label="URL товара"
                color="#272727"
                text-color="#272727"
              />
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col class="mb-4 pa-4 white elevation-2">
              <v-file-input
                v-model:value="files"
                :label="isUpdate ? 'Загрузить изображения' : 'Загруить изображение мождно только после создания продукта'"
                color="#272727"
                text-color="#272727"
                :disabled="!isUpdate"
                @update:value="onLoadImage"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="it in computedAssets"
              :key="it._id"
              xl="2"
              lg="4"
              md="6"
              sm="12"
              class="image mb-4 mr-1 pa-2 white elevation-2 d-flex justify-center align-center"
              :class="{'main': it.main}"
              style="height: 250px; overflow: hidden; position: relative"
              @contextmenu.prevent="onImagesContextMenu($event, it)"
            >
              <img
                style="height: auto; width: 100%"
                :src="'http://193.168.3.84' + it.url"
                alt=""
              >
              <v-icon
                clickable
                style="position: absolute; top: 5px; right: 5px"
                @click="onDeleteImage(it)"
              >
                fas fa-times
              </v-icon>
            </v-col>
            <v-menu
              v-model="imagesContextMenu.show"
              :position-x="imagesContextMenu.positionX"
              :position-y="imagesContextMenu.positionY"
              width="200"
              absolute
              open-on-click
              @hide="imagesContextMenu.show = false"
            >
              <v-list
                class="images-menu white"
              >
                <v-list-item
                  class="images-menu__item"
                  @click="setAsMainImage"
                >
                  <v-list-item-title>
                    установить главным
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  class="images-menu__item"
                  @click="onDeleteImage(currentImage)"
                >
                  <v-list-item-title>
                    удалить
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-row>
            <v-col class="elevation-2 white mb-4">
              <v-card width="100%">
                <v-card-title>
                  <h3>Описание товара</h3>
                </v-card-title>
                <v-card-content>
                  <text-editor
                    :key="content"
                    v-model:content="computedDescription"
                  />
                </v-card-content>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col
              xl="12"
              class="elevation-2 pt-2 white"
            >
              <v-card width="100%">
                <v-card-title>
                  <h3>
                    Категории
                  </h3>
                </v-card-title>
                <v-card-content>
                  <template
                    v-for="it in categoryItems"
                    :key="it._id"
                  >
                    <v-group
                      v-if="it.children.length"
                      :title="it.title"
                      class="elevation-2"
                      :expand="isUpdate"
                    >
                      <v-list>
                        <v-list-item
                          v-for="c in it.children"
                          :key="c._id"
                          :class="[{'green white--text text--base': ctgMap.get(c._id)}]"
                          @click="toggleCategory(c)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ c.title }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-group>
                    <v-list
                      v-else-if="!it.parent && !it.children.length"
                      class="elevation-2"
                    >
                      <v-list-item
                        :class="[{'green white--text text--base': ctgMap.get(it._id)}]"
                        @click="toggleCategory(it)"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ it.title }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-card-content>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col class="white mt-2 elevation-2">
              <v-card
                width="100%"
              >
                <v-card-title>
                  <h3>Атрибуты</h3>
                </v-card-title>
                <v-card-content>
                  <draggable
                    v-model="attributesArray"
                    item-key="_id"
                    @change="onAttributesUpdate"
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
                            @input="onAttributesUpdate"
                          />
                          <v-icon
                            class="mr-3"
                            color="grey lighten-2"
                            clickable
                            style="position: absolute; top: 0; right: 0"
                            @click="onDeleteAttribute(element)"
                          >
                            fas fa-trash-alt
                          </v-icon>
                        </v-col>
                      </v-row>
                    </template>
                  </draggable>
                </v-card-content>
              </v-card>
            </v-col>
          </v-row>
          <v-row
            v-if="isUpdate"
            no-gutter
          >
            <v-col class="white mt-2 elevation-2">
              <v-card
                width="100%"
              >
                <v-card-title>
                  <h3>Варианты</h3>
                </v-card-title>
                <v-card-subtitle v-if="!isUpdate">
                  Варианты товара, например: размеры, цвета, технические характеристики и т.д.
                </v-card-subtitle>
                <v-card-content>
                  <v-row
                    v-for="(variant, i) in variantItems"
                    :key="variant.group"
                    class="elevation-2 pa-2 mb-1"
                  >
                    <v-col cols="3">
                      <h2>{{ variant.group }}</h2>
                      <v-row v-if="variants && variants[i]">
                        <v-chip
                          v-for="it in variants[i].options"
                          :key="it.name"
                          color="green"
                          class="elevation-2"
                          @close="removeVariantOption(variants[i], it)"
                        >
                          {{ it.name }}
                        </v-chip>
                      </v-row>
                    </v-col>
                    <v-col cols="8">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model.trim="variantOptions[i].name"
                            color="#272727"
                            label="Значение"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model.number="variantOptions[i].count"
                            color="#272727"
                            label="количество"
                            type="number"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model.number="variantOptions[i].price"
                            color="#272727"
                            label="цена"
                            type="number"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model.trim="variantOptions[i].description"
                            color="#272727"
                            label="описание"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-file-input
                            v-model="variantOptions[i].assets"
                            color="#272727"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-row>
                      <v-button
                        color="green"
                        elevation="2"
                        @click="addVariant(variantItems[i].group, variantOptions[i])"
                      >
                        добавить
                      </v-button>
                    </v-row>
                  </v-row>
                </v-card-content>
              </v-card>
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

  .image {
    border: 2px solid transparent;
  }

  .main {
    border-color: #05b105;
  }

  .attribute:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .images-menu {
    &__item {
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
</style>
