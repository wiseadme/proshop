import { ref, unref } from 'vue'
import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { ICategory } from '@proshop/types'
import { useCategory } from '@modules/categories/composables/use-category'
import { RouteNames } from '@modules/categories/enums/route-names'
import { CREATE } from '@shared/constants/actions'
import { INFO_BLOCK } from '@modules/products/constants/sections'
import { useRouter } from 'vue-router'

export const useCategoriesTable = () => {
    const router = useRouter()
    const { categories, setAsCurrent } = useCategoriesService()
    const { setCategoryModel } = useCategory()

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
    }
}
