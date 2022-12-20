<script setup lang="ts">
  import { PropType } from 'vue'
  import { IProduct } from '@modules/product/types'
  import { icons } from '@shared/constants/icons'

  defineProps({
    products: {
      type: Array as PropType<Array<IProduct>>,
      default: () => []
    }
  })

  defineEmits([
    'delete:product',
    'open:edit-modal',
    'open:create-modal'
  ])

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center'
    },
    {
      key: 'name',
      title: 'Название',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.name
    },
    {
      key: 'url',
      title: 'Url товара',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.url
    },
    {
      key: 'price',
      title: 'Цена',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.price
    },
    {
      key: 'quantity',
      title: 'Количество',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.quantity
    },
    {
      key: 'summary',
      title: 'Сумма',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
    },
    {
      key: 'image',
      title: 'Картинка',
      width: '150',
      resizeable: true,
      sortable: true,
      filterable: true
    },
    {
      key: 'categories',
      title: 'Категории',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.categories.reduce((acc, c, i, arr) => {
        acc += c.title
        if (i + 1 !== arr.length) acc += ', '

        return acc
      }, '')
    },
    {
      key: 'seo',
      title: 'SEO',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.seo.title
    }
  ])

</script>
<template>
  <v-data-table
    :cols="cols"
    :rows="products || []"
    class="elevation-2"
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
    <template #actions="{row}">
      <v-button
        color="orange"
        elevation="2"
        text
        @click="$emit('open:edit-modal', row)"
      >
        <v-icon>{{ icons.PEN }}</v-icon>
      </v-button>
      <v-button
        class="ml-1"
        color="red darken-1"
        elevation="2"
        text
        @click="$emit('delete:product', row)"
      >
        <v-icon>{{ icons.TRASH }}</v-icon>
      </v-button>
    </template>
    <template #summary="{row}">
      <span>{{ Number(row.quantity * row.price).toFixed(2) }} руб.</span>
    </template>
    <template #image="{row}">
      <img
        v-if="row.image"
        :src="row.image"
        :alt="row.name"
        style="width: auto; height: 30px"
      >
      <span v-else>null</span>
    </template>
  </v-data-table>
</template>
