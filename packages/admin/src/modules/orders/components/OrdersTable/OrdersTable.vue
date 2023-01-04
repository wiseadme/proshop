<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { PropType } from 'vue'
  import { IOrder } from '@modules/orders/types'
  import { useOrdersService } from '@modules/orders/service/order.service'

  defineProps({
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array as PropType<Array<IOrder>>,
      default: () => []
    },
    rowsOptions: {
      type: Array,
      default: () => ([ 5, 10, 15, 20 ])
    }
  })

  defineEmits([
    'add:order',
    'edit:order',
    'delete:order',
    'open:order',
  ])

  const service = useOrdersService()

  service.addSubscriber()

  onBeforeUnmount(() => service.removeSubscriber())

</script>
<template>
  <v-data-table
    :cols="cols"
    :rows="rows"
    :footer-options="{
      counts: {
        displayColor: 'green',
        rowsPerPageText: 'кол-во строк',
        rowsPerPageOptions: rowsOptions
      },
      pagination: {
        buttonsColor: 'green',
        displayColor: 'green',
      }
    }"
    class="elevation-2"
    show-checkbox
    show-sequence
  >
    <template #toolbar>
      <v-toolbar>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-button
            color="green"
            elevation="5"
            @click="$emit('add:order')"
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
        color="blue"
        elevation="2"
        text
        @click="$emit('open:order', row)"
      >
        <v-icon>fas fa-file-alt</v-icon>
      </v-button>
      <v-button
        class="ml-1"
        color="orange"
        elevation="2"
        text
        :disabled="row.status && !row.status.seen"
        @click="$emit('edit:order', row)"
      >
        <v-icon>fas fa-pen</v-icon>
      </v-button>
      <v-button
        class="ml-1"
        color="red darken-1"
        elevation="2"
        text
        :disabled="row.status && !row.status.seen"
        @click="$emit('delete:order', row)"
      >
        <v-icon>fas fa-trash-alt</v-icon>
      </v-button>
    </template>
    <template #qrcode="{ row }">
      <div class="d-flex justify-center align-center">
        <img
          v-if="row.qrcode"
          style="height: 30px; width: auto"
          :src="row.qrcode"
        />
        <v-icon v-else>
          fas fa-box
        </v-icon>
      </div>
    </template>
    <template #status="{ row, format }">
      <div
        class="d-flex justify-center align-center py-2 white--text"
        :class="row.status && row.status.created && !row.status.seen ? 'green' : 'blue'"
        style="width: 100%; height: 100%; border-radius: 10px"
      >
        {{ format(row) }}
      </div>
    </template>
  </v-data-table>
</template>
