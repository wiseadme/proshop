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
                v-for="(variant) in existsVariantsMap"
                :key="variant.group"
                v-model="selectedVariants"
                :label="variant?.group"
                :value="variant"
                class="mr-4 mb-4"
                color="green"
                @change="toggleVariants"
              />
            </v-col>
          </v-row>
          <v-row
            v-for="variant in selectedVariants"
            :key="variant.group"
            class="elevation-2 pa-4 mb-1"
          >
            <v-col
              style="border: 1px solid #272727; border-radius: 5px;"
              class="px-4 py-6"
            >
              <v-row>
                <v-col>
                  <h2>
                    {{ variant.group }}
                  </h2>
                </v-col>
              </v-row>
              <v-row v-if="variant">
                <v-col>
                  <v-chip
                    v-for="option in variant.options"
                    :key="option.name"
                    :color="!option._id ?'grey': option === currentEditableOption ? 'green lighten-3' : 'green'"
                    :class="['mr-2 mt-2', {'elevation-2 ': option !== currentEditableOption}]"
                    @click="setOptionForEditing(variant, option)"
                    @close="removeVariantOption(option)"
                  >
                    {{ option.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              v-if="displayedOptions.get(variant)"
              style="border: 1px solid #272727; border-radius: 5px;"
              class="py-4 mt-2"
            >
              <v-form v-slot="{validate}">
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.trim="displayedOptions.get(variant).name"
                      color="#272727"
                      label="значение"
                      :rules="[val => !!val || 'Обязательное поле']"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="displayedOptions.get(variant).quantity"
                      color="#272727"
                      label="количество"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="displayedOptions.get(variant).price"
                      color="#272727"
                      label="цена"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.trim="displayedOptions.get(variant).description"
                      color="#272727"
                      label="описание"
                    />
                  </v-col>
                  <v-col>
                    <v-file-input
                      v-model="displayedOptions.get(variant).assets"
                      :label="!displayedOptions.get(variant)._id ? 'только после сохранения варианта *': 'загрузить изображения'"
                      color="#272727"
                      :disabled="!displayedOptions.get(variant)._id"
                      placeholder="salam"
                      @update:value="onUploadVariantImage($event, displayedOptions.get(variant), variant._id)"
                    />
                  </v-col>
                </v-row>
                <v-row class="px-2 pt-2">
                  <div
                    class="variant-images pa-2"
                    style="width: 100%; min-height: 200px; border: 1px dotted #272727; border-radius: 5px;"
                  >
                    <v-row>
                      <v-col
                        v-if="!displayedOptions.get(variant).assets.length"
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
                        <v-row>
                          <v-col
                            v-for="asset in displayedOptions.get(variant).assets"
                            :key="asset._id"
                            cols="2"
                            style="height: 130px; position: relative"
                            class="d-flex align-center justify-center elevation-2"
                          >
                            <v-icon
                              style="position: absolute; top: 5px; right: 5px;"
                              icon="fas fa-times"
                              clickable
                              @click="onDeleteVariantImage(asset, variant)"
                            />
                            <img
                              :src="asset.url"
                              style="width: 100px;"
                            >
                          </v-col>
                        </v-row>
                      </template>
                    </v-row>
                  </div>
                </v-row>
                <v-row class="mt-4 ml-2">
                  <v-button
                    color="green"
                    elevation="2"
                    @click="addOptionInVariant(validate, variant)"
                  >
                    {{ displayedOptions.get(variant)._id ? 'изменить' : 'добавить' }}
                  </v-button>
                  <v-button
                    class="ml-2"
                    color="error"
                    elevation="2"
                    @click="clearVariantOptionForm(variant)"
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
