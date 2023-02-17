<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { PropType } from 'vue'
  import { IOrder } from '@ecommerce-platform/types'
  import { useOrdersService } from '@modules/order/service/order.service'

  defineProps({
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array as PropType<Array<IOrder>>,
      default: () => []
    },
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
        rowsPerPageOptions: [ 20, 40, 60, 80 ]
      },
      pagination: {
        buttonsColor: 'green',
        displayColor: 'green',
      }
    }"
    class="elevation-2"
    show-sequence
  >
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
