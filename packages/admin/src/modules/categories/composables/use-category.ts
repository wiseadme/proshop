import {
    computed,
    ref,
    unref,
    watch,
} from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { Category } from '@modules/categories/model/category.model'
import { IAsset, ICategory } from '@proshop/types'
import { clone } from '@shared/helpers'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { SAVING_ERROR } from '@shared/constants/notifications'
import {
    CATEGORY_DELETED,
    CATEGORY_IMAGE_DELETED,
    CATEGORY_IMAGE_SAVED,
} from '@modules/categories/constants/notifications'

export const useCategory = createSharedComposable(() => {
    const {
        category,
        setAsCurrent,
        deleteCategory,
        uploadCategoryImage,
        deleteCategoryImage,
    } = useCategoriesService()

    const { notify } = useNotifications()

    const model = ref<ICategory>(Category.create())

    const isEditMode = computed(() => Boolean(unref(model).id))

    const setCategoryModel = (value: Maybe<ICategory>) => {
        model.value = value ? Category.create(clone(value)) : Category.create()
    }

    const onUploadCategoryImage = async (file: File) => {
        try {
            await uploadCategoryImage(file)
            unref(model).image = unref(category)!.image

            notify(CATEGORY_IMAGE_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteCategoryImage = async (asset: IAsset) => {
        try {
            await deleteCategoryImage(asset)

            notify(CATEGORY_IMAGE_DELETED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteCategory = async (category: ICategory) => {
        try {
            await deleteCategory(category.id)

            notify(CATEGORY_DELETED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onAddNew = () => {
        setAsCurrent(null)
        model.value = Category.create()
    }

    watch(category, setCategoryModel, { immediate: true })

    return {
        model,
        isEditMode,
        onAddNew,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onDeleteCategory,
        setCategoryModel,
    }
})
