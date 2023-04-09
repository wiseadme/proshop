<script lang="ts">
  import { defineComponent } from 'vue'
  import CategoryActionsModal from '@modules/category/components/CategoryActionsModal'
  import CategoryTable from '@modules/category/components/CategoriesTable'
  import { useCategory } from '@modules/category/composables/use-category'
  import { useCategoriesService } from '@modules/category/composables/use-categories-service'
  import { useCategoryActionsModal } from '@modules/category/composables/use-category-actions-modal'
  import { useCategoriesTable } from '@modules/category/composables/use-categories-table'

  export default defineComponent({
    name: 'categories-page',
    components: {
      CategoryActionsModal,
      CategoryTable
    },
    setup() {
      const {
        categories,
        getCategories
      } = useCategoriesService()

      const {
        model,
        isEditMode,
        onEdit,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onDeleteCategory,
        onCreateCategory,
        onUpdateCategory,
        onAddNew
      } = useCategory()

      const { cols } = useCategoriesTable()
      const { showModal } = useCategoryActionsModal()

      getCategories()

      return {
        cols,
        categories,
        model,
        isEditMode,
        showModal,
        onAddNew,
        onEdit,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onDeleteCategory,
        onCreateCategory,
        onUpdateCategory,
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
          :rows="categories"
          @open:create-modal="onAddNew"
          @open:edit-modal="onEdit"
          @delete:category="onDeleteCategory($event._id)"
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
      :categories="categories"
      :is-update="isEditMode"
      @create="onCreateCategory"
      @update="onUpdateCategory"
      @delete:image="onDeleteCategoryImage"
      @upload:image="onUploadCategoryImage"
    />
  </v-layout>
</template>
