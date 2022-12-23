<script setup lang="ts">
  import { watch } from 'vue'
  import { OrderDocument } from './OrderDocument'
  import { OrderForm } from './OrderForm'

  defineEmits([
    'close'
  ])

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    }
  })

  let currentComponent: any = null

  watch(() => [ props.isUpdate, props.isRead ], ([ isUpdate, isRead ]) => {
    if (isRead) {
      currentComponent = OrderDocument
    }

    if (isUpdate) {
      console.log('update')
    }

    if (!isRead && !isUpdate) {
      currentComponent = OrderForm
    }
  }, { immediate: true })

</script>
<template>
  <v-modal
    :model-value="modelValue"
    transition="scale-in"
    width="70%"
    overlay
  >
    <component
      :is="currentComponent"
      :order="order"
      :is-update="isUpdate"
      @close="$emit('close')"
    />
  </v-modal>
</template>
