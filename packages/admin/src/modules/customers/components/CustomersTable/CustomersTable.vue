<script setup lang="ts">
  import { PropType } from 'vue'
  import { ICustomer } from '@ecommerce-platform/types'

  defineProps({
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array as PropType<Array<ICustomer>>,
      default: () => []
    }
  })

  defineEmits([
    'open:create-modal',
    'open:edit-modal',
    'delete:customer'
  ])

</script>
<template>
  <v-data-table
    :cols="cols"
    :rows="rows"
    :footer-options="{
      counts: {
        displayColor: 'green',
        rowsPerPageText: 'кол-во строк'
      },
      pagination: {
        buttonsColor: 'green',
        displayColor: 'green'
      }
    }"
    class="elevation-2"
    show-sequence
  >
    <template #pagination-text="{start, last, length}">
      <span>{{ `с ${ start } по ${ last } из ${ length }` }}</span>
    </template>
    <template #image="{ row }">
      <div class="d-flex justify-center align-center">
        <img
          v-if="row.image"
          style="height: 30px; width: auto"
          :src="row.image"
        />
        <v-icon v-else>
          fas fa-box
        </v-icon>
      </div>
    </template>
  </v-data-table>
</template>
