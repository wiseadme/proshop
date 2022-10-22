<script lang="ts" setup>
  import { toRaw, watch } from 'vue'
  // Services
  import { useProductService } from '@modules/product/service/product.service'
  // Model
  import { Product } from '@modules/product/model/product.model'
  // Helpers
  import { getDifferences } from '@shared/helpers'
  import { clone } from '@shared/helpers'
  // Components
  import { ProductActionsModal } from '@modules/product/components/ProductActionsModal'
  import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader'
  // Types
  import { IProduct } from '@modules/product/types'

  let model = $ref<IProduct>(Product.create())
  let showCreateModal = $ref<boolean>(false)
  let hasChanges = $ref<boolean>(false)
  let isEditMode = $ref<boolean>(false)
  let loading = $ref<boolean>(true)

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

  const service = useProductService()

  const onCreate = () => {
    service.createProduct(model)
      .then(() => showCreateModal = false)
      .then(() => model = Product.create())
  }

  const onAdd = () => {
    showCreateModal = true
    isEditMode = false

    model = Product.create()
    model.attributes = clone(service.attributes)
  }

  const checkDiffs = (): Maybe<Partial<IProduct>> => {
    return getDifferences(
      toRaw(model),
      service.product
    )
  }

  const onUpdate = () => {
    const updates = checkDiffs()!

    updates._id = model._id

    service.updateProduct(updates)
      .then(() => {
        showCreateModal = false
        isEditMode = false
      })
  }

  const onDeleteProduct = (product) => {
    service.deleteProduct(product)
  }

  const onUploadVariantImage = ({ file, option }) => {
    return service.uploadProductVariantImage(file, option)
      .then((optionData) => {
        option.assets = optionData.assets
      })
  }

  const onDeleteVariantImage = ({ asset, option }) => {
    service.deleteProductVariantImage({ asset, option })
      .then(() => {
        option.assets = option.assets.reduce((assets, it) => {
          if (it._id !== asset._id) assets.push(it)
          return assets
        }, [])
      })
  }

  const onCreateVariantOption = (option) => {
    service.createVariantOption(option)
      .then(() => model.variants = service.product!.variants!)
  }

  const onUpdateVariantOption = (option) => {
    service.updateVariantOption(option)
      .then(() => model.variants = service.product!.variants)
  }

  const onDeleteVariantOption = ({ option }) => {
    service.deleteVariantOption(option)
      .then(() => {
        model.variants = service.product?.variants!
      })
  }

  const onUploadImage = (image) => {
    service.uploadProductImage(image)
      .then(() => {
        model.assets = service.product?.assets!
      })
  }

  const onDeleteImage = (asset) => {
    service.deleteProductImage(asset)
      .then(() => {
        model.assets = service.product?.assets!
      })
  }

  const onEdit = (row) => {
    service.setAsCurrent(row)
    model = Product.create(row)

    showCreateModal = true
    isEditMode = true
  }

  const onCloseModal = () => {
    if (hasChanges) {
      showCreateModal = false
    }
  }

  const onDiscard = () => {
    model = Product.create(service.product!)
  }

  watch(() => model, () => {
    const diffs = checkDiffs()

    if (!(diffs?.assets && diffs.image)) {
      delete diffs?.assets
      delete diffs?.image
    }

    if (diffs?.variants) {
      delete diffs?.variants
    }

    hasChanges = isEditMode
      && !!diffs
      && !!Object.keys(diffs).length

  }, { deep: true })

  Promise.all([
    service.getCategories(),
    service.getAttributes(),
    service.getProducts(),
    service.getUnits(),
    service.getVariants()
  ])
    .then(() => loading = false)

</script>
<template>
  <v-layout column>
    <v-row>
      <v-col cols="12">
        <skeleton-preloader v-if="loading"/>
        <v-data-table
          v-else
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
      :is-edit="isEditMode"
      :has-changes="hasChanges"
      @create="onCreate"
      @update="onUpdate"
      @close="onCloseModal"
      @discard="onDiscard"
      @upload:image="onUploadImage"
      @delete:image="onDeleteImage"
      @upload:variant-image="onUploadVariantImage"
      @delete:variant-image="onDeleteVariantImage"
      @create:variant-option="onCreateVariantOption"
      @update:variant-option="onUpdateVariantOption"
      @delete:variant-option="onDeleteVariantOption"
    />
  </v-layout>
</template>
