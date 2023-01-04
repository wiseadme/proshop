<script lang="ts" setup>
  import {onMounted, onBeforeUnmount} from 'vue'
  import { getDifferences, clone } from '@shared/helpers'
  import { useCategoryService } from '@modules/category/service/category.service'
  import { Category } from '@modules/category/model/category.model'
  import { CategoryActionsModal } from '@modules/category/components/CategoryActionsModal'
  import { CategoryTable } from '@modules/category/components/CategoriesTable'
  import { ICategory } from '@ecommerce-platform/types'

  let categoryModel = $ref<ICategory>(Category.create())
  let categoryUpdates = $ref<Maybe<ICategory>>(null)

  let isEditMode = $ref<boolean>(false)
  let showModal = $ref<boolean>(false)

  const service = useCategoryService()

  const model = $computed<Maybe<ICategory>>(() => {
    if (isEditMode) return categoryUpdates

    return categoryModel
  })

  const onEdit = (row) => {
    service.setAsCurrent(row)
    categoryUpdates = clone(row)

    isEditMode = true
    showModal = true
  }

  const onUploadImage = (file) => {
    service.uploadCategoryImage(file)
      .then((url) => model!.image = url)
  }

  const onDeleteImage = (url) => {
    service.deleteImageHandler(url)
      .then(() => model!.image = null)
  }

  const onDeleteCategory = (category) => {
    service.deleteCategory(category)
  }

  const onAddNew = () => {
    showModal = true
    isEditMode = false

    service.setAsCurrent(null)
    categoryModel = Category.create({})
  }

  const onCreate = () => {
    service.createCategory(model)
      .then(() => categoryModel = Category.create({}))
      .then(() => showModal = false)
  }

  const onUpdate = () => {
    const updates = getDifferences(
      categoryUpdates,
      service.category
    ) as Maybe<Partial<ICategory>>

    if (!updates) {
      return
    }

    updates!._id = service.category!._id

    if (updates!.parent) {
      updates!.parent = (categoryUpdates?.parent as ICategory)?._id
    }

    service.updateCategory(updates!)
      .then(() => {
        showModal = false
        isEditMode = false
        categoryUpdates = null
      })
  }

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center'
    },
    {
      key: 'title',
      title: 'Название',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.title
    },
    {
      key: 'url',
      title: 'Url категории',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.url
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
      key: 'parent',
      title: 'Родительская категория',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.parent?.title
    },
    {
      key: 'length',
      title: 'Кол-во позиций в категории',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.length
    },
    {
      key: 'seo',
      title: 'SEO',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.seo.title
    },
    {
      key: 'order',
      title: 'Порядковый номер',
      width: '200',
      resizeable: true,
      sortable: true,
      filterable: true
    }
  ])

  service.getCategories()

  onMounted(() => console.log('MOUNTED'))
  onBeforeUnmount(() => console.log('BEFORE UNMOUNT'))

</script>
<template>
  <v-layout
    column
  >
    <v-row>
      <v-col>
        <category-table
          :cols="cols"
          :rows="service.categories"
          @open:create-modal="onAddNew"
          @open:edit-modal="onEdit"
          @delete:category="onDeleteCategory"
        />
      </v-col>
    </v-row>
    <category-actions-modal
      v-model="showModal"
      v-model:title="model.title"
      v-model:url="model.url"
      v-model:image="model.image"
      v-model:seo-title="model.seo.title"
      v-model:seo-description="model.seo.description"
      v-model:seo-keywords="model.seo.keywords"
      v-model:parent="model.parent"
      v-model:order="model.order"
      v-model:conditions="model.conditions"
      :categories="service.categories"
      :is-update="isEditMode"
      @create="onCreate"
      @update="onUpdate"
      @delete:image="onDeleteImage"
      @upload:image="onUploadImage"
    />
  </v-layout>
</template>
