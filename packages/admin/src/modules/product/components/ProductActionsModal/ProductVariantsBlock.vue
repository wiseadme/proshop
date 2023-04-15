<script lang="ts">
  import {
    defineComponent,
    ref,
    unref,
    watch
  } from 'vue'
  import { IVariant, IVariantOption } from '@ecommerce-platform/types'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductVariants } from '@modules/product/composables/use-product-variants'

  export default defineComponent({
    name: 'product-variants-block',
    setup() {
      const { model, isEditMode } = useProduct()

      const {
        variantItems,
        isVariantEditMode,
        genVariantOptionPattern,
        onUploadProductVariantImage,
        onDeleteProductVariantImage,
        onUpdateProductVariantOption,
        onCreateProductVariantOption,
        onDeleteProductVariantOption,
      } = useProductVariants()

      const currentVariant = ref<Maybe<IVariant>>(null)
      const existsVariants = ref<IVariant[]>([])
      const optionPattern = ref<Maybe<IVariantOption>>(null)

      const setExistsVariants = (variants) => {
        const variantsMap = {}

        unref(existsVariants).forEach((it) => variantsMap[it.group] = it)
        variants?.forEach(v => variantsMap[v.group] = v)

        existsVariants.value = Object.values(variantsMap)
      }

      const createOption = async (validate) => {
        validate().then(() => {
          unref(optionPattern)!.variantId = unref(currentVariant)!._id!

          if (unref(isVariantEditMode)) {
            onUpdateProductVariantOption(unref(optionPattern))
          } else {
            onCreateProductVariantOption(unref(optionPattern))
          }
        })
      }

      const setCurrentVariant = (variant) => {
        optionPattern.value = genVariantOptionPattern()
        currentVariant.value = variant
        isVariantEditMode.value = false
      }

      const setOptionForEditing = (option) => {
        isVariantEditMode.value = true
        optionPattern.value = option
      }

      const onUploadVariantImage = ([ file ], option) => {
        onUploadProductVariantImage({ file, option })
      }

      const onDeleteVariantImage = (asset) => {
        const option = unref(optionPattern)
        onDeleteProductVariantImage({ asset, option })
      }

      const clearVariantOptionForm = () => {
        isVariantEditMode.value = false
        optionPattern.value = genVariantOptionPattern()
      }

      watch(variantItems, (variants) => {
        if (!variants) return

        setExistsVariants(variants)

        if (!unref(currentVariant)) {
          setCurrentVariant(unref(existsVariants)[0])
        }

      }, { immediate: true })

      /**
       * @description Наблюдаем в режиме редактирования за вариантами продукта
       * и перезаписываем мапу существующих вариантов для редактирования
       */
      watch(() => unref(model).variants, (variants) => {
        setExistsVariants(variants.length ? variants : unref(variantItems))

        if (unref(currentVariant)) {
          setCurrentVariant(variants?.find(v => v._id === unref(currentVariant)!._id) || unref(existsVariants)?.[0])
        } else {
          currentVariant.value = variants?.[0] || unref(existsVariants)?.[0]!
        }

      }, { immediate: true })

      optionPattern.value = genVariantOptionPattern()

      return {
        existsVariants,
        currentVariant,
        optionPattern,
        variantItems,
        isEditMode,
        setCurrentVariant,
        createOption,
        setOptionForEditing,
        onUploadVariantImage,
        onDeleteProductVariantOption,
        onUploadProductVariantImage,
        onDeleteVariantImage,
        clearVariantOptionForm
      }
    }
  })

</script>
<template>
  <v-row
    v-if="variantItems"
    class="mt-2 elevation-2 pa-4"
  >
    <v-col class="block-head pb-6 mb-8">
      <h2 class="block-head__title">
        Варианты
      </h2>
    </v-col>
    <v-col v-if="variantItems.length">
      <v-button
        v-for="variant in existsVariants"
        :key="variant._id"
        :label="variant?.group"
        class="mr-2 mb-4"
        outlined
        rounded
        :color="currentVariant._id === variant._id ? 'var(--primary)' : 'grey lighten-1'"
        :disabled="!isEditMode"
        @click="setCurrentVariant(variant)"
      >
        {{ variant.group }}
      </v-button>
    </v-col>
    <v-col
      v-if="currentVariant && currentVariant.options"
      style="border-radius: 5px;"
      class="pa-2 elevation-2"
    >
      <v-chip
        v-for="option in currentVariant.options"
        :key="option._id"
        :color="!option._id ?'grey': option === optionPattern ? 'primary' : 'blue lighten-3'"
        :class="['mr-2']"
        closable
        @click="setOptionForEditing(option)"
        @close="onDeleteProductVariantOption({variant: currentVariant, option})"
      >
        {{ option.name }}
      </v-chip>
    </v-col>
    <v-col
      style="border-radius: 5px;"
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
              :disabled="!isEditMode"
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
              :disabled="!isEditMode"
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
              :disabled="!isEditMode"
            />
          </v-col>
          <v-col
            cols="6"
          >
            <v-text-field
              v-model.trim="optionPattern.description"
              color="#272727"
              :disabled="!isEditMode"
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
            color="primary"
            elevation="2"
            :disabled="!isEditMode"
            @click="createOption(validate)"
          >
            {{ optionPattern._id ? 'изменить' : 'добавить' }}
          </v-button>
          <v-button
            class="ml-2"
            color="error"
            elevation="2"
            :disabled="!isEditMode"
            @click="clearVariantOptionForm"
          >
            очистить
          </v-button>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
