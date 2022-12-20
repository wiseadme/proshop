<script setup lang="ts">
  import { PropType, toRaw, watch } from 'vue'
  import { IProductConditions } from '@ecommerce-platform/types'
  import { getProductConditionTitle } from '@modules/product/helpers'

  const props = defineProps({
    conditions: Object as PropType<IProductConditions>
  })

  let rawConditions = $ref(toRaw(JSON.parse(JSON.stringify(props.conditions))))

  const emit = defineEmits([
    'update:conditions'
  ])

  watch(() => rawConditions, newConditions => {
    emit('update:conditions', newConditions)
  }, { deep: true })

</script>
<template>
  <v-row class="py-2 px-1 white elevation-2">
    <v-col class="mb-4 green--text">
      <h2>Состояния товара</h2>
    </v-col>
    <v-col
      v-for="key of Object.keys(rawConditions)"
      :key="key"
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="rawConditions[key]"
        :label="getProductConditionTitle(key)"
      />
    </v-col>
  </v-row>
</template>
