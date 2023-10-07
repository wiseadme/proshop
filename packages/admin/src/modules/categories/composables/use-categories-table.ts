import { ref, unref } from 'vue'
import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { ICategory } from '@proshop/types'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'
import { RouteNames } from '@modules/categories/enums/route-names'
import { CREATE } from '@shared/constants/actions'
import { INFO_BLOCK } from '@modules/products/constants/sections'
import { useRouter } from 'vue-router'
import { CATEGORY_DELETED } from '@modules/categories/constants/notifications'
import { SAVING_ERROR } from '@shared/constants/notifications'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'

export const useCategoriesTable = () => {
    const { categories, setAsCurrent, deleteCategory } = useCategoriesService()
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
        setCategoryModel(null)
        setAsCurrent(null)

        return router.push({
            name: RouteNames.CATEGORY_EDIT,

            params: {
                action: CREATE,
                section: INFO_BLOCK,
            },
        })
    }

    return {
        cols,
        onCreateRow,
        onDeleteRow,
    }
}
