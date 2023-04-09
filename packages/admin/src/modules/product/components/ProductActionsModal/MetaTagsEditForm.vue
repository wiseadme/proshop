<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useProductMetaTags } from '@modules/product/composables/use-product-metatags'

  export default defineComponent({
    name: 'meta-tag-edit-form',
    setup() {
      const { metaTag } = useProductMetaTags()

      const metaTagKeys = computed<string[]>(() => Object.keys(unref(metaTag)?.props!))

      return {
        metaTag,
        metaTagKeys,
      }
    }
  })
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
