<script setup lang="ts">
  import { ICategory } from '@ecommerce-platform/types'

  const emit = defineEmits(['load:related'])

  const props = defineProps({
    products: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  })

  let category = $ref<Maybe<ICategory>>(null)

  let computedCategory = $computed({
    get: () => category || props.categories?.[0],
    set: (val) => {
      category = val as ICategory
      emit('load:related', val)
    }
  })

</script>
<template>
  <v-row no-gutter>
    <v-col
      class="white elevation-2"
    >
      <v-card
        color="white"
        style="width: 100%"
      >
        <v-card-title>
          <h3 class="green--text">
            Рекомендуемые товары
          </h3>
        </v-card-title>
        <v-card-content>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="computedCategory"
                label="Категории"
                :items="categories"
                value-key="title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip
                v-for="it in products"
                :key="it._id"
                :title="it.name"
                elevation="2"
                class="mr-2 mb-2"
              />
            </v-col>
          </v-row>
        </v-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>
