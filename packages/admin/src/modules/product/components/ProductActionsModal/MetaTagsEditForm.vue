<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { useProductMetaTags } from '@modules/product/composables/use-product-metatags'

  const { metaTag } = useProductMetaTags()

  const metaTagKeys = computed<string[]>(() => Object.keys(unref(metaTag)?.props!))
</script>
<template>
  <v-row
    style="border-radius: 5px"
    class="elevation-2 ma-1"
  >
    <v-col
      v-for="key in metaTagKeys"
      :key="key"
      xl="6"
      lg="6"
      md="12"
    >
      <v-text-field
        v-model="metaTag.props[key]"
        :label="key"
      />
    </v-col>
  </v-row>
</template>
