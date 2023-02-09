<script setup lang="ts">
  import { PropType, watch } from 'vue'
  import { OrderDocument } from './OrderDocument'
  import { OrderForm } from './OrderForm'
  import { IUser } from '@ecommerce-platform/types'

  defineEmits([
    'close',
    'update:order'
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
    users: {
      type: Array as PropType<IUser[]>,
      default: () => []
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
      :users="users"
      :is-update="isUpdate"
      @close="$emit('close')"
      @update:order="$emit('update:order', $event)"
    />
  </v-modal>
</template>
