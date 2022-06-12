<script lang="ts">
  import { variantsBlock } from './variants-block'

  export default variantsBlock
</script>
<template>
  <v-row no-gutter>
    <v-col class="white mt-2 elevation-2">
      <v-card
        width="100%"
      >
        <v-card-title>
          <h3>Варианты</h3>
        </v-card-title>
        <v-card-subtitle>
          Варианты товара, например: размеры, цвета, технические характеристики и т.д.
        </v-card-subtitle>
        <v-card-content>
          <v-row>
            <v-col>
              <v-checkbox
                v-for="(variant) in displayedVariants"
                :key="variant.group"
                v-model="selectedVariants"
                :label="variant?.group"
                :value="variant"
                class="mr-4 mb-4"
                color="green"
                @change="onChange"
              />
            </v-col>
          </v-row>
          <v-row
            v-for="(variant, i) in selectedVariants"
            :key="variant.group"
            class="elevation-2 pa-4 mb-1"
          >
            <v-col
              style="border: 1px solid #272727; border-radius: 5px;"
              class="px-4 py-6"
            >
              <h2>
                {{ variant.group }}
              </h2>
              <v-row v-if="variant">
                <v-chip
                  v-for="(it, j) in variant.options"
                  :key="it.name"
                  :color="!it._id ?'grey': 'green'"
                  class="elevation-2 mr-2 mt-2"
                  @click="onEditChip(it, i)"
                  @close="removeVariantOption(variant, j)"
                >
                  {{ it.name }}
                </v-chip>
              </v-row>
            </v-col>
            <v-col
              style="border: 1px solid #272727; border-radius: 5px;"
              class="py-4 mt-2"
            >
              <v-form v-slot="{validate}">
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.trim="displayedOptions[i].name"
                      color="#272727"
                      label="значение"
                      :rules="[val => !!val || 'Обязательное поле']"
                      @input="updateOption"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="displayedOptions[i].count"
                      color="#272727"
                      label="количество"
                      type="number"
                      @input="updateOption"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="displayedOptions[i].price"
                      color="#272727"
                      label="цена"
                      type="number"
                      @input="updateOption"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.trim="displayedOptions[i].description"
                      color="#272727"
                      label="описание"
                      @input="updateOption"
                    />
                  </v-col>
                  <v-col>
                    <v-file-input
                      v-model="displayedOptions[i].assets"
                      :label="!displayedOptions[i]._id ? 'загрузить изображение можно только после сохранения варианта': 'загрузить изображения'"
                      color="#272727"
                      :disabled="!displayedOptions[i]._id"
                      placeholder="salam"
                      @update:value="updateAssets($event, displayedOptions[i])"
                    />
                  </v-col>
                </v-row>
                <v-row class="px-2 pt-2">
                  <div
                    class="variant-images"
                    style="width: 100%; min-height: 200px; border: 1px dotted #272727; border-radius: 5px;"
                  >
                    <h4 class="pa-2">
                      изображения
                    </h4>
                    <v-row>
                      <v-col
                        v-if="!displayedOptions[i].assets.length"
                        cols="4"
                        offset="4"
                        class="d-flex justify-center align-center"
                        style="height: 130px"
                      >
                        <div
                          class="grey--text text--lighten-2"
                        >
                          тут должны быть изображения варианта
                        </div>
                      </v-col>
                      <template v-else>
                        <v-col
                          v-for="asset in displayedOptions[i].assets"
                          :key="asset._id"
                          cols="4"
                          style="height: 130px"
                        >
                          <img
                            :src="'http://anar.com'+asset.url"
                            width="150"
                          >
                        </v-col>
                      </template>
                    </v-row>
                  </div>
                </v-row>
                <v-row class="mt-4 ml-2">
                  <v-button
                    color="green"
                    text
                    outlined
                    @click="addOptionInVariant(validate, variant, i)"
                  >
                    добавить
                  </v-button>
                  <v-button
                    class="ml-2"
                    color="error"
                    text
                    outlined
                    @click="clearVariantOptionForm(i)"
                  >
                    очистить
                  </v-button>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>
