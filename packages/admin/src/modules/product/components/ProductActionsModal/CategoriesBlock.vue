<script lang="ts">
  import { defineComponent } from 'vue'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductCategories } from '@modules/product/composables/use-product-categories'

  export default defineComponent({
    name: 'categories-block',
    setup() {
      const { isEditMode, categoryItems } = useProduct()
      const { toggleCategory, categoriesMap } = useProductCategories()

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
