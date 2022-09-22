<script lang="ts">
  import { defineComponent, shallowRef, ref, unref, toRaw, watch } from 'vue'
  import { ProductActionsModal } from '../components/ProductActionsModal'
  // Services
  import { useProductService } from '../service/product.service'
  // Model
  import { Product } from '../model/product.model'
  // Helpers
  import { getDifferences } from '@shared/helpers'
  import { clone } from '@shared/helpers'

  import { IProduct } from '../types'

  export default defineComponent({
    components: { ProductActionsModal },
    async setup(){
      const model = ref<IProduct>(Product.create())

      const showCreateModal = shallowRef<boolean>(false)
      const hasChanges = shallowRef<boolean>(false)
      const isEditMode = shallowRef<boolean>(false)

      const cols = ref([
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

      const service = useProductService()

      const onCreate = () => {
        service.createProduct(model.value)
          .then(() => showCreateModal.value = false)
          .then(() => model.value = Product.create())
      }

      const onAdd = () => {
        showCreateModal.value = true
        isEditMode.value = false

        model.value = Product.create()
        model.value.attributes = clone(service.attributes)
      }

      const checkDiffs = (): Maybe<Partial<IProduct>> => {
        return getDifferences(
          toRaw(model.value),
          service.product
        )
      }

      const onUpdate = () => {
        const updates = checkDiffs()

        !!updates && (updates._id = model.value._id)

        !!updates && service.updateProduct(updates)
          .then(() => {
            showCreateModal.value = false
            isEditMode.value = false
          })
      }

      const onDeleteProduct = (product) => {
        service.deleteProduct(product)
      }

      const onUploadVariantImage = ({ file, option, variantId }) => {
        return service.uploadProductVariantImage(file, option, variantId)
          .then((asset) => option.assets.push(asset))
      }

      const onDeleteVariantImage = ({ asset, option, variant }) => {
        service.deleteProductVariantImage({ asset, option, variant })
        .then(() => {
          option.assets = option.assets.reduce((assets, it) => {
            if (it._id !== asset._id) assets.push(it)
            return assets
          }, [])
        })
      }

      const onUploadImage = (image) => {
        service.uploadProductImage(image)
          .then(() => {
            model.value.assets = service.product?.assets!
          })
      }

      const onDeleteImage = (url) => {
        service.deleteProductImage(url)
          .then(() => {
            model.value.assets = service.product?.assets!
          })
      }

      const onEdit = (row) => {
        service.setAsCurrent(row)
        model.value = Product.create(row)

        showCreateModal.value = true
        isEditMode.value = true
      }

      const onCloseModal = () => {
        if (!unref(hasChanges)) {
          showCreateModal.value = false
        }
      }

      const onDiscard = () => {
        model.value = Product.create(service.product!)
      }

      watch(model, () => {
        hasChanges.value = unref(isEditMode) && !!checkDiffs()
      }, { deep: true })

      await Promise.all([
        service.getCategories(),
        service.getAttributes(),
        service.getProducts(),
        service.getUnits(),
        service.getVariants()
      ])

      return {
        cols,
        model,
        service,
        showCreateModal,
        hasChanges,
        isEditMode,
        onAdd,
        onEdit,
        onCreate,
        onUpdate,
        onDeleteProduct,
        onCloseModal,
        onDeleteImage,
        onUploadImage,
        onUploadVariantImage,
        onDeleteVariantImage,
        onDiscard,
        checkDiffs
      }
    }
  })
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :cols="cols"
          :rows="service.products || []"
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
                  @click="onAdd"
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
          <template #actions="{row}">
            <v-button
              color="orange"
              elevation="2"
              text
              @click="onEdit(row)"
            >
              <v-icon>fas fa-pen</v-icon>
            </v-button>
            <v-button
              class="ml-1"
              color="red darken-1"
              elevation="2"
              text
              @click="onDeleteProduct(row)"
            >
              <v-icon>fas fa-trash-alt</v-icon>
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
      </v-col>
    </v-row>
    <product-actions-modal
      v-model="showCreateModal"
      v-model:name="model.name"
      v-model:price="model.price"
      v-model:quantity="model.quantity"
      v-model:assets="model.assets"
      v-model:image="model.image"
      v-model:url="model.url"
      v-model:unit="model.unit"
      v-model:description="model.description"
      v-model:categories="model.categories"
      v-model:seo="model.seo"
      v-model:attributes="model.attributes"
      v-model:variants="model.variants"
      v-model:is-visible="model.isVisible"
      :category-items="service.categories"
      :variant-items="service.variants"
      :unit-items="service.units"
      :is-update="isEditMode"
      :has-changes="hasChanges"
      @create="onCreate"
      @update="onUpdate"
      @close="onCloseModal"
      @discard="onDiscard"
      @upload:image="onUploadImage"
      @delete:image="onDeleteImage"
      @upload:variant-image="onUploadVariantImage"
      @delete:variant-image="onDeleteVariantImage"
    />
  </v-layout>
</template>
