<script setup lang="ts">
import { PropType } from 'vue'
import { ICategory } from '@ecommerce-platform/types'

defineProps({
  cols: {
    type: Array,
    required: true
  },
  rows: {
    type: Array as PropType<Array<ICategory>>,
    default: () => []
  }
})

defineEmits([
  'add',
  'edit',
  'delete'
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
    show-checkbox
    show-sequence
  >
    <template #toolbar>
      <v-toolbar>
        <v-toolbar-logo></v-toolbar-logo>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-button
            color="green"
            elevation="5"
            @click="$emit('add')"
          >
            <v-icon
              size="14"
              sm
            >
              fas fa-plus
            </v-icon>
          </v-button>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template #pagination-text="{start, last, length}">
      <span>{{ `с ${ start } по ${ last } из ${ length }` }}</span>
    </template>
    <template #actions="{row}">
      <v-button
        color="orange"
        elevation="2"
        text
        @click="$emit('edit', row)"
      >
        <v-icon>fas fa-pen</v-icon>
      </v-button>
      <v-button
        class="ml-1"
        color="red darken-1"
        elevation="2"
        text
        @click="$emit('delete', row)"
      >
        <v-icon>fas fa-trash-alt</v-icon>
      </v-button>
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
