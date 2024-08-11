import { ref, unref } from 'vue'

import { useRouter } from 'vue-router'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { ICategory } from '@proshop-app/types'

import { CATEGORY_DELETED } from '@modules/categories/constants/notifications'
import { RouteNames } from '@modules/categories/enums/route-names'
import { INFO_BLOCK } from '@modules/products/constants/sections'
import { CREATE, EDIT } from '@shared/constants/actions'
import { SAVING_ERROR } from '@shared/constants/notifications'

export const useCategoriesTable = () => {
    const { categories, deleteCategory } = useCategoriesService()
    const { setCategoryModel } = useCategoryModel()
    const { notify } = useNotifications()
    const router = useRouter()

    const cols = ref([
        {
            key: 'actions',
            title: 'Действия',
            align: 'center',
        },
        {
            key: 'title',
            title: 'Название',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: ICategory) => row.title,
        },
        {
            key: 'url',
            title: 'Url категории',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: ICategory) => row.url,
        },
        {
            key: 'image',
            title: 'Картинка',
            width: '150',
            resizeable: true,
            sortable: true,
            filterable: true,
        },
        {
            key: 'parentId',
            title: 'Родительская категория',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: ICategory) => {
                if (row.parentId) {
                    return unref(categories).find(it => it.id === row.parentId)?.title
                }

                return ''
            },

        },
        {
            key: 'length',
            title: 'Кол-во позиций в категории',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: ICategory) => row.length,
        },
        {
            key: 'seo',
            title: 'SEO',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: ICategory) => row.seo?.title,
        },
        {
            key: 'order',
            title: 'Порядковый номер',
            width: '200',
            resizeable: true,
            sortable: true,
            filterable: true,
        },
    ])

    const onDeleteRow = async (category: ICategory) => {
        try {
            await deleteCategory(category.id)

            notify(CATEGORY_DELETED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onCreateRow = () => {
        setCategoryModel()

        return router.push({
            name: RouteNames.CATEGORY_EDIT,

            params: {
                action: CREATE,
                section: INFO_BLOCK,
            },
        })
    }

    const onEditRow = (row: ICategory) => {
        setCategoryModel(row)

        return router.push({
            name: RouteNames.CATEGORY_EDIT,
            params: {
                action: EDIT,
                categoryId: row.id,
                section: INFO_BLOCK
            }
        })
    }

    return {
        cols,
        onCreateRow,
        onDeleteRow,
        onEditRow,
    }
}
