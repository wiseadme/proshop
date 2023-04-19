<script lang="ts" setup>
  import { icons } from '@shared/enums/icons'
  import { useProductsService } from '@modules/product/composables/use-products-service'
  import { useProductsTable } from '@modules/product/composables/use-products-table'
  import { IProduct } from '@ecommerce-platform/types'

  defineEmits<{
    (e: 'delete:product', product: IProduct): void
    (e: 'open:edit-modal'): void
    (e: 'open:create-modal'): void
  }>()

  const { products, totalLength } = useProductsService()
  const { cols } = useProductsTable()

</script>
<template>
  <v-data-table
    :cols="cols"
    :rows="products || []"
    class="elevation-2 app-border-radius"
    :footer-options="{
      counts: {
        displayColor: 'primary',
        rowsPerPageText: 'кол-во строк',
        totalRows: totalLength,
        rowsPerPageOptions: [20, 40, 60, 80]
      },
      pagination: {
        buttonsColor: 'primary',
        displayColor: 'primary'
      }
    }"
    show-sequence
  >
    <template #toolbar>
      <v-toolbar>
        <v-toolbar-logo></v-toolbar-logo>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-button
            color="primary"
            elevation="5"
            @click="$emit('open:create-modal')"
          >
            <v-icon
              size="14"
              sm
            >
              {{ icons.PLUS }}
            </v-icon>
          </v-button>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template #pagination-text="{start, last, length}">
      <span>{{ start + ' - ' + last + ' из ' + length + ' строк' }}</span>
    </template>
    <template #actions="{row}">
      <v-button
        color="orange"
        elevation="2"
        text
        style="z-index: 0"
        @click="$emit('open:edit-modal', row)"
      >
        <v-icon>{{ icons.PEN }}</v-icon>
      </v-button>
      <v-button
        class="ml-2"
        color="red darken-1"
        elevation="2"
        text
        style="z-index: 0"
        @click="$emit('delete:product', row)"
      >
        <v-icon>{{ icons.TRASH }}</v-icon>
      </v-button>
    </template>
    <template #summary="{row}">
      <span>{{ Number(row.quantity * row.price).toFixed(2) }}</span>
    </template>
    <template #image="{row}">
      <div
        v-if="row.image"
        class="elevation-2"
        style="width: 40px; height: 40px; border-radius: 50px; overflow: hidden"
      >
        <img
          :src="row.image"
          :alt="row.name"
          style="width: auto; height: 100%; object-fit: contain"
        >
      </div>
      <span v-else>null</span>
    </template>
  </v-data-table>
</template>
