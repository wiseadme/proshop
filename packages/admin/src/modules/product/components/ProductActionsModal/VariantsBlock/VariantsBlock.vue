<script lang="ts" setup>
  import { PropType, toRaw, watch } from 'vue'
  import { IVariant, IVariantOption } from '@modules/variant/types'

  const props = defineProps({
    isDisplayed: Boolean,
    isEdit: Boolean,
    variantItems: Array as PropType<Array<IVariant>>,
    variants: Array as PropType<Array<IVariant>>
  })

  const emit = defineEmits([
    'update:variants',
    'create:variant-option',
    'delete:variant-option',
    'update:variant-option',
    'upload:variant-image',
    'delete:variant-image'
  ])

  let currentVariant = $ref<Maybe<IVariant>>(null)
  let existsVariants = $ref<IVariant[]>([])
  let optionPattern = $ref<IVariantOption>()
  let isEditingMode = false

  const genOptionPattern = () => ({
    _id: '',
    variantId: '',
    name: '',
    quantity: 0,
    price: 0,
    description: null,
    assets: []
  })

  const setExistsVariants = (vars) => {
    const map = existsVariants.reduce((acc, it) => {
      acc[it.group] = it
      return acc
    }, {})

    vars?.forEach(v => {
      map[v.group] = v
    })

    existsVariants = Object.values(map)
  }

  const createOption = (validate) => {
    validate()
      .then(() => {
        optionPattern.variantId = currentVariant!._id

        const rawOption = toRaw(optionPattern)

        if (isEditingMode) {
          emit('update:variant-option', rawOption)
        } else {
          emit('create:variant-option', rawOption)
        }
      })
  }

  const removeVariantOption = (variant, option) => {
    emit('delete:variant-option', { variant, option })
  }

  const setCurrentVariant = (variant) => {
    optionPattern = genOptionPattern()
    currentVariant = variant
  }

  const setOptionForEditing = (option) => {
    isEditingMode = true
    optionPattern = option
  }

  const onUploadVariantImage = ([ file ], option) => {
    emit('upload:variant-image', { file, option })
  }

  const onDeleteVariantImage = (asset, variant) => {
    const option = toRaw(optionPattern)
    emit('delete:variant-image', { asset, option, variant })
  }

  const clearVariantOptionForm = () => {
    isEditingMode = false
    optionPattern = genOptionPattern()
  }

  watch(() => props.variantItems, (variants) => {
    setExistsVariants(variants)

    if (!currentVariant) {
      setCurrentVariant(existsVariants[0])
    }

  }, { immediate: true })

  watch(() => props.variants, (variants) => {
    if (variants!.length) {
      setExistsVariants(variants)
    } else {
      setExistsVariants(props.variantItems)
    }

    if (currentVariant) {
      setCurrentVariant(variants?.find(
        v => v._id === currentVariant!._id) || existsVariants?.[0]
      )
    } else {
      currentVariant = variants?.[0] || existsVariants?.[0]!
    }

  }, { immediate: true })

  optionPattern = genOptionPattern()

</script>
<template>
  <v-row
    v-if="variantItems"
    no-gutter
  >
    <v-col class="white mt-2 elevation-2">
      <v-card width="100%">
        <v-card-title>
          <h3>Варианты</h3>
        </v-card-title>
        <v-card-subtitle>
          Варианты товара, например: размеры, цвета и т.д.
        </v-card-subtitle>
        <v-card-content v-if="variantItems.length">
          <v-row>
            <v-button
              v-for="variant in existsVariants"
              :key="variant._id"
              :label="variant?.group"
              class="mr-2 mb-4"
              elevation="2"
              :color="currentVariant._id === variant._id ? 'green' : 'orange'"
              :disabled="!isEdit"
              height="24"
              @click="setCurrentVariant(variant)"
            >
              {{ variant.group }}
            </v-button>
          </v-row>
          <v-row class="elevation-2 pa-4 mb-1">
            <v-col
              style="border: 1px solid #272727; border-radius: 5px;"
              class="px-4 py-6"
            >
              <v-row>
                <v-col>
                  <v-chip
                    v-for="option in currentVariant.options"
                    :key="option._id"
                    :color="!option._id ?'grey': option === optionPattern ? 'green lighten-3' : 'green'"
                    :class="['mr-2 mt-2', {'elevation-2 ': option !== optionPattern}]"
                    @click="setOptionForEditing(option)"
                    @close="removeVariantOption(currentVariant, option)"
                  >
                    {{ option.name }}
                  </v-chip>
                </v-col>
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
                      v-model.trim="optionPattern.name"
                      color="#272727"
                      label="значение *"
                      :rules="[val => !!val || 'Обязательное поле']"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="optionPattern.quantity"
                      color="#272727"
                      label="количество"
                      type="number"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.number="optionPattern.price"
                      color="#272727"
                      label="цена"
                      type="number"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model.trim="optionPattern.description"
                      color="#272727"
                      :disabled="!isEdit"
                      label="описание"
                    />
                  </v-col>
                  <v-col>
                    <v-file-input
                      v-model="optionPattern.assets"
                      :label="!optionPattern._id ? 'только после сохранения варианта *': 'загрузить изображения'"
                      color="#272727"
                      :disabled="!optionPattern._id"
                      placeholder="salam"
                      @update:value="onUploadVariantImage($event, optionPattern)"
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
                        v-if="!optionPattern.assets.length"
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
                            v-for="asset in optionPattern.assets"
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
                    :disabled="!isEdit"
                    @click="createOption(validate)"
                  >
                    {{ optionPattern._id ? 'изменить' : 'добавить' }}
                  </v-button>
                  <v-button
                    class="ml-2"
                    color="error"
                    elevation="2"
                    :disabled="!isEdit"
                    @click="clearVariantOptionForm"
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
