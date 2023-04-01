<script lang="ts">
  import { computed, defineComponent, nextTick, ref, unref, watch } from 'vue'
  import { TextEditor } from '@shared/components/TextEditor'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
  import { useProductCategories } from '@modules/product/composables/use-product-categories'
  // Components
  import AttributesBlock from './AttributesBlock.vue'
  import ConditionsBlock from './ConditionsBlock.vue'
  import VariantsBlock from './VariantsBlock.vue'
  import MetaTagsBlock from './MetaTagsBlock.vue'
  import RelatedBlock from './RelatedBlock.vue'
  import InfoBlock from './InfoBlock.vue'
  import CategoriesBlock from './CategoriesBlock.vue'

  export default defineComponent({
    name: 'product-actions-modal',
    components: {
      AttributesBlock,
      VariantsBlock,
      ConditionsBlock,
      MetaTagsBlock,
      RelatedBlock,
      CategoriesBlock,
      InfoBlock,
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
        onDiscardProductChanges,
      } = useProduct()

      const { toggleCategory, categoriesMap } = useProductCategories()

      const { showModal, closeActionsModal } = useProductActionsModal()

      const content = ref<string>('')
      const textEditorRerenderKey = ref<string>('')

      const computedModalHeader = computed<string>(() => `${ (unref(isEditMode) ? 'Редактирование' : 'Создание') } продукта`)

      const onSubmit = (validate) => {
        if (unref(isEditMode)) return onUpdateProduct()

        validate().then(onCreateProduct)
      }

      const onDiscardChanges = () => {
        textEditorRerenderKey.value = `${ Date.now() }`

        nextTick(() => {
          unref(categoriesMap).clear()
          unref(model).categories?.forEach(toggleCategory)
        })

        onDiscardProductChanges()
      }

      watch(showModal, () => {
        content.value = unref(model).description!
        textEditorRerenderKey.value = Date.now().toString()
      }, { immediate: true })

      return {
        model,
        showModal,
        computedModalHeader,
        isEditMode,
        hasChanges,
        isLoading,
        isSaved,
        content,
        textEditorRerenderKey,
        categoriesMap,
        categoryItems,
        unitItems,
        onSubmit,
        onDiscardChanges,
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
            <info-block class="product-modal-block"/>
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
            <categories-block class="product-modal-block"/>
            <attributes-block class="product-modal-block"/>
            <meta-tags-block class="product-modal-block"/>
            <variants-block class="product-modal-block"/>
            <related-block
              v-if="categoryItems"
              class="mt-2 product-modal-block"
            />
            <conditions-block
              v-model:conditions="model.conditions"
              class="mt-2 product-modal-block"
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
