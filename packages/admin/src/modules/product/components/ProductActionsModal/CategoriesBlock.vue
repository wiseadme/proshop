<script lang="ts">
  import { defineComponent, unref, watch } from 'vue'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductsService } from '@modules/product/composables/use-products-service'
  import { useProductCategories } from '@modules/product/composables/use-product-categories'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'

  export default defineComponent({
    name: 'categories-block',
    setup() {
      const { isEditMode, model, hasChanges } = useProduct()
      const { categoryItems } = useProductsService()
      const { toggleCategory, categoriesMap } = useProductCategories()
      const { showModal } = useProductActionsModal()

      watch(showModal, (state) => state && unref(categoriesMap).clear())

      watch(isEditMode, () => {
        unref(model)!.categories.forEach(ctg => {
          if (!unref(categoriesMap).get(ctg._id!)) toggleCategory(ctg)
        })
      })

      watch(hasChanges, (state) => {
        if (state) return

        unref(categoriesMap).clear()
        unref(model).categories?.forEach(toggleCategory)
      })

      return {
        isEditMode,
        categoryItems,
        categoriesMap,
        toggleCategory
      }
    }
  })
</script>
<template>
  <v-row
    class="white elevation-2 mt-2"
    no-gutter
  >
    <v-col xl="12">
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
</template>
