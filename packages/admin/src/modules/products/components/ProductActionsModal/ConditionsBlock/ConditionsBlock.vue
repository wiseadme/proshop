<script setup lang="ts">
  import { PropType, toRaw, watch } from 'vue'
  import { IProductConditions } from '@ecommerce-platform/types'
  import { getProductConditionTitle } from '@modules/products/helpers'
  import { $computed } from 'vue/macros'

  const props = defineProps({
    conditions: Object as PropType<IProductConditions>
  })

  let rawConditions

  const emit = defineEmits([
    'update:conditions'
  ])

  const countable = $computed({
    get: () => props.conditions!.countable,
    set(val){
      rawConditions.countable = val
      emit('update:conditions', rawConditions)
    }
  })

  const exists = $computed({
    get: () => props.conditions!.exists,
    set(val){
      rawConditions.exists = val
      emit('update:conditions', rawConditions)
    }
  })

  const visible = $computed({
    get: () => props.conditions!.visible,
    set(val){
      rawConditions.visible = val
      emit('update:conditions', rawConditions)
    }
  })

  watch(() => props.conditions, (newConditions) => {
    rawConditions = toRaw(JSON.parse(JSON.stringify(newConditions)))
  }, { immediate: true })

</script>
<template>
  <v-row class="py-2 px-1 white elevation-2">
    <v-col class="mb-4 green--text">
      <h2>Состояния товара</h2>
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="countable"
        :label="getProductConditionTitle('countable')"
      />
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="exists"
        :label="getProductConditionTitle('exists')"
      />
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="visible"
        :label="getProductConditionTitle('visible')"
      />
    </v-col>
  </v-row>
</template>
