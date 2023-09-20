import { ref, unref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryActionsModal } from '@modules/categories/composables/use-category-actions-modal'
import { Category } from '@modules/categories/model/category.model'
import { ICategory } from '@proshop/types'
import { clone, getDifferences } from '@shared/helpers'

export const useCategory = createSharedComposable(() => {
    const {
        category,
        setAsCurrent,
        deleteCategory,
        createCategory,
        updateCategory,
        uploadCategoryImage,
        deleteCategoryImage,
    } = useCategoriesService()

    const {
        closeActionsModal,
        openActionsModal,
    } = useCategoryActionsModal()

    const model = ref<ICategory>(Category.create())
    const isEditMode = ref<boolean>(false)
    const hasChanges = ref<boolean>(false)

    const setEditModeState = (state) => isEditMode.value = state

    const onEdit = (row: ICategory) => {
        model.value = Category.create(clone(row))

        setAsCurrent(row)
        setEditModeState(true)
        openActionsModal()
    }

    const onUploadCategoryImage = async (file: File) => {
        await uploadCategoryImage(file)
        unref(model).image = unref(category)!.image
    }

    const onDeleteCategoryImage = async (url: string) => {
        await deleteCategoryImage(url)

        unref(model)!.image = null
    }

    const onDeleteCategory = (category: ICategory) => deleteCategory(category.id)

    const onAddNew = () => {
        openActionsModal()
        setEditModeState(false)

        setAsCurrent(null)
        model.value = Category.create()
    }

    const onCreateCategory = async () => {
        await createCategory(unref(model))

        model.value = Category.create()
        closeActionsModal()
    }

    const onUpdateCategory = async () => {
        const updates = getDifferences(
            unref(model),
            unref(category),
        ) as Maybe<Partial<ICategory>>

        if (!updates) return

        updates!.id = unref(category)!.id

        await updateCategory(updates!)

        closeActionsModal()
        setEditModeState(false)
    }

    return {
        model,
        isEditMode,
        hasChanges,
        onEdit,
        onAddNew,
        onCreateCategory,
        onUpdateCategory,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onDeleteCategory,
    }
})
