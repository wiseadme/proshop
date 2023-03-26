<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch, unref } from 'vue'
  import {
    ICategory,
    IAsset,
    IAttribute,
  } from '@ecommerce-platform/types'
  import { clone } from '@shared/helpers'
  import { TextEditor } from '@shared/components/TextEditor'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
  // Components
  import VariantsBlock from './VariantsBlock.vue'
  import ConditionsBlock from './ConditionsBlock.vue'
  import MetaTagsBlock from './MetaTagsBlock.vue'
  import RelatedBlock from './RelatedBlock.vue'
  import AttributesBlock from './AttributesBlock.vue'

  export default defineComponent({
    name: 'product-actions-modal',
    components: {
      AttributesBlock,
      VariantsBlock,
      ConditionsBlock,
      MetaTagsBlock,
      RelatedBlock,
      TextEditor,
    },
    setup() {
      const {
        model,
        isEditMode,
        isLoading,
        isSaved,
        hasChanges,
        categoryItems,
        unitItems,
        onUpdateProduct,
        onCreateProduct,
        onDeleteProductImage,
        onUploadProductImage,
        onDiscardProductChanges,
      } = useProduct()

      const { showModal, closeActionsModal } = useProductActionsModal()

      const categoriesMap = ref<Map<string, ICategory>>(new Map())
      const imagesContextMenu = ref({
        show: false,
        positionX: 0,
        positionY: 0,
      })

      const productImages = ref<Array<File>>([])
      const attributesArray = ref<Array<IAttribute>>([])
      const currentImage = ref<Maybe<IAsset>>(null)
      const content = ref<string>('')
      const textEditorRerenderKey = ref<string>('')

      const computedModalHeader = computed<string>(() => `${ (unref(isEditMode) ? 'Редактирование' : 'Создание') } продукта`)

      const onImagesContextMenu = (event, asset) => {
        unref(imagesContextMenu).show = true
        unref(imagesContextMenu).positionX = event.clientX
        unref(imagesContextMenu).positionY = event.clientY

        currentImage.value = clone(asset)
      }

      const toggleCategory = (ctg) => {
        const category = unref(categoriesMap).get(ctg._id)

        category ? categoriesMap.value.delete(ctg._id) : categoriesMap.value.set(ctg._id, ctg)
        unref(model).categories = Array.from(unref(categoriesMap).values())
      }

      const onAttributesUpdate = () => {
        unref(model).attributes = unref(attributesArray)
      }

      const onSubmit = (validate) => {
        if (unref(isEditMode)) return onUpdateProduct()

        validate().then(onCreateProduct)
      }

      const onLoadImage = ([ file ]) => {
        if (!file) return

        onUploadProductImage(file)
        productImages.value = []
      }

      const setAsMainImage = () => {
        unref(model).image = unref(currentImage)!.url

        unref(model).assets = clone(unref(model).assets).map((it) => {
          it.main = it._id === unref(currentImage)!._id

          return it
        })
      }

      const onDiscardChanges = () => {
        textEditorRerenderKey.value = `${ Date.now() }`

        nextTick(() => {
          unref(categoriesMap).clear()
          unref(model).categories?.forEach(toggleCategory)
          attributesArray.value = clone(unref(model).attributes)
        })

        onDiscardProductChanges()
      }

      watch(showModal, (state) => {
        unref(categoriesMap).clear()

        attributesArray.value = clone(unref(model).attributes)
        content.value = unref(model).description!
        textEditorRerenderKey.value = Date.now().toString()

        if (!state || !unref(isEditMode)) return

        unref(model)!.categories.forEach(ctg => {
          if (!unref(categoriesMap).get(ctg._id!)) toggleCategory(ctg)
        })

      }, { immediate: true })

      return {
        model,
        showModal,
        computedModalHeader,
        productImages,
        isEditMode,
        hasChanges,
        isLoading,
        isSaved,
        content,
        textEditorRerenderKey,
        imagesContextMenu,
        categoriesMap,
        attributesArray,
        currentImage,
        categoryItems,
        unitItems,
        onImagesContextMenu,
        onAttributesUpdate,
        onSubmit,
        onLoadImage,
        setAsMainImage,
        onDiscardChanges,
        toggleCategory,
        onDeleteProductImage,
        closeActionsModal
      }
    }
  })

</script>
<template>
  <div>
    <v-modal
      v-model="showModal"
      transition="scale-in"
      width="90%"
      overlay
    >
      <v-form v-slot="{validate}">
        <v-card
          color="rgba(0,0,0,.4)"
          width="100%"
          class="elevation-5"
        >
          <v-card-title class="white--text text--base">
            <h3>{{ computedModalHeader }}</h3>
          </v-card-title>
          <v-card-content
            class="grey lighten-3"
            width="100%"
            style="height: 80vh; max-height: 80vh; overflow: auto"
          >
            <v-row class="white my-4 pa-4 elevation-2">
              <v-col xl="6">
                <v-text-field
                  v-model.trim="model.name"
                  label="Наименование товара"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.number="model.price"
                  label="Цена"
                  color="#272727"
                  text-color="#272727"
                  type="number"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.number="model.quantity"
                  label="Количество"
                  color="#272727"
                  type="number"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-select
                  v-model="model.unit"
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
                  v-model="model.seo.title"
                  label="SEO title"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model="model.seo.description"
                  label="SEO description"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model="model.seo.keywords"
                  label="SEO keywords"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
              <v-col xl="6">
                <v-text-field
                  v-model.trim="model.url"
                  label="URL товара"
                  color="#272727"
                  text-color="#272727"
                />
              </v-col>
            </v-row>
            <v-row no-gutter>
              <v-col class="mb-4 pa-4 white elevation-2">
                <v-file-input
                  :value="productImages"
                  :label="isEditMode ? 'Загрузить изображения' : 'Загрузить изображение можно только после создания продукта'"
                  color="#272727"
                  text-color="#272727"
                  :disabled="!isEditMode"
                  @update:value="onLoadImage"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="it in model.assets"
                :key="it._id"
                xl="2"
                lg="4"
                md="6"
                sm="12"
                class="image mb-4 mr-1 pa-2 white elevation-2 d-flex justify-center align-center"
                :class="{'product-image--main': it.main}"
                style="height: 250px; overflow: hidden; position: relative"
                @contextmenu.prevent="onImagesContextMenu($event, it)"
              >
                <img
                  style="height: auto; width: 100%"
                  :src="it.url"
                  class=""
                  alt=""
                >
                <v-icon
                  clickable
                  style="position: absolute; top: 5px; right: 5px"
                  @click="onDeleteProductImage(it)"
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
                    @click="onDeleteProductImage(currentImage)"
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
                  <v-card-title class="green--text">
                    <h3 class="primary--text">
                      Описание товара
                    </h3>
                  </v-card-title>
                  <v-card-content>
                    <text-editor
                      :key="textEditorRerenderKey"
                      v-model:content="model.description"
                      content-type="html"
                      :global-options="{
                        placeholder: 'введите описание товара'
                      }"
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
                    <h3 class="primary--text">
                      Категории
                    </h3>
                  </v-card-title>
                  <v-card-content>
                    <template
                      v-for="it in categoryItems"
                      :key="it._id"
                    >
                      <v-group
                        v-if="it.children && it.children.length"
                        :title="it.title"
                        class="elevation-2"
                        :expand="isEditMode"
                      >
                        <v-list>
                          <v-list-item
                            v-for="c in it.children"
                            :key="c._id"
                            :class="[{'green white--text text--base': categoriesMap.get(c._id)}]"
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
                          :class="[{'green white--text text--base': categoriesMap.get(it._id)}]"
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
            <attributes-block/>
            <meta-tags-block/>
            <variants-block/>
            <related-block
              v-if="categoryItems"
              class="mt-2"
            />
            <conditions-block
              v-model:conditions="model.conditions"
              class="mt-2"
            />
          </v-card-content>
          <v-card-actions>
            <v-button
              color="green"
              elevation="3"
              width="120"
              :disabled="!hasChanges && isEditMode"
              :loading="!isSaved"
              @click="onSubmit(validate)"
            >
              сохранить
            </v-button>
            <v-button
              color="orange accent-2"
              class="ml-4"
              width="120"
              elevation="3"
              :disabled="hasChanges"
              @click="closeActionsModal"
            >
              отмена
            </v-button>
            <v-button
              v-if="isEditMode"
              class="ml-4"
              elevation="3"
              color="red darken-2"
              :disabled="!hasChanges"
              @click="onDiscardChanges"
            >
              сбросить изменения
            </v-button>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-modal>
  </div>
</template>
<style lang="scss">
  @import "styles/ProductActionsModal";
</style>
