<script lang="ts">
  import { defineComponent, ref, shallowRef, unref, computed } from 'vue'
  import { getDifferences, clone } from '@shared/helpers'

  import { useCategoryService } from '../service/category.service'
  import { Category } from '../model/category.model'
  import { CategoryActionsModal } from '../components/CategoryActionsModal'
  import { CategoryTable } from '../components/CategoryTable'

  export default defineComponent({
    components: {
      CategoryTable,
      CategoryActionsModal
    },

    setup(){
      const categoryModel = ref<ICategory>(Category.create())
      const categoryUpdates = ref<Maybe<ICategory>>(null)

      const isEditMode = shallowRef<boolean>(false)
      const showModal = shallowRef<boolean>(false)

      const service = useCategoryService()

      const model = computed<Maybe<ICategory>>(() => {
        if (isEditMode.value) return categoryUpdates.value

        return categoryModel.value
      })

      const onEdit = (row) => {
        service.setAsCurrent(row)
        categoryUpdates.value = clone(row)

        isEditMode.value = true
        showModal.value = true
      }

      const onUploadImage = (file) => {
        service.uploadCategoryImage(file)
          .then((url) => model.value!.image = url)
      }

      const onDeleteImage = (url) => {
        service.deleteImageHandler(url)
          .then(() => model.value!.image = null)
      }

      const onDeleteCategory = (category) => {
        service.deleteCategory(category)
      }

      const onAddNew = () => {
        showModal.value = true
        isEditMode.value = false

        service.setAsCurrent(null)

        categoryModel.value = Category.create({})
      }

      const onCreate = () => {
        service.createCategory(model.value)
          .then(() => categoryModel.value = Category.create({}))
          .then(() => showModal.value = false)
      }

      const onUpdate = () => {
        const updates: Maybe<ICategoryUpdates> = getDifferences(
          unref(categoryUpdates),
          service.category
        ) as ICategoryUpdates

        if (!updates) return

        updates!._id = service.category!._id

        if (updates!.parent) {
          updates!.parent = unref(categoryUpdates)?.parent?._id
        }

        service.updateCategory(updates!)
          .then(() => {
            showModal.value = false
            isEditMode.value = false
            categoryUpdates.value = null
          })
      }

      const cols = ref([
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

      return {
        cols,
        model,
        service,
        isEditMode,
        showModal,
        onAddNew,
        onEdit,
        onCreate,
        onDeleteImage,
        onUpdate,
        onUploadImage,
        onDeleteCategory
      }
    }
  })
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
          @add="onAddNew"
          @edit="onEdit"
          @delete="onDeleteCategory"
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
      v-model:isVisible="model.isVisible"
      :categories="service.categories"
      :is-update="isEditMode"
      @create="onCreate"
      @update="onUpdate"
      @delete:image="onDeleteImage"
      @upload:image="onUploadImage"
    />
  </v-layout>
</template>
