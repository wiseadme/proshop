import { ref } from 'vue'
// Composables
import { useProductsService } from '@modules/products/composables/use-products-service'
import { NavigationFailure, useRouter } from 'vue-router'
import { useProduct } from '@modules/products/composables/use-product'
// Constants
import { CREATE_PRODUCT, EDIT_PRODUCT } from '@modules/products/constants/actions'
import { INFO_BLOCK } from '@modules/products/constants/sections'
// Enums
import { RouteNames } from '@modules/products/enums/route-names'
// Types
import { ICategory, IProduct } from '@proshop/types'

export const useProductsTable = () => {
    const router = useRouter()

    const {
        pagination,
        sort,
        totalLength,
        products,
        getProducts,
    } = useProductsService()

    const { setProductModel } = useProduct()

    const onUpdateTablePage = async (page: number) => {
        pagination.setPage(page)

        return getProducts({})
    }

    const onUpdateTableRowsCount = (count: number) => {
        pagination.setItemsCount(count)
    }

    const onSortColumn = (col) => {
        const { sorted } = col
        sorted ? sort.setAsc(col.key) : sort.setDesc(col.key)

        setTimeout(() => getProducts())
    }

    const onEditRow = (row: IProduct): Promise<void | NavigationFailure | undefined> => {
        setProductModel(row)

        return router.push({
            name: RouteNames.PRODUCT_EDIT,

            params: {
                action: EDIT_PRODUCT,
                productId: row.id,
                section: INFO_BLOCK,
            },
        })
    }

    const onCreateRow = () => {
        setProductModel()

        return router.push({
            name: RouteNames.PRODUCT_EDIT,

            params: {
                action: CREATE_PRODUCT,
                section: INFO_BLOCK,
            },
        })
    }

    const cols = ref([
        {
            key: 'actions',
            title: 'Действия',
            align: 'center',
        },
        {
            key: 'name',
            title: 'Название',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => row.name,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'url',
            title: 'Url товара',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => row.url,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'price',
            title: 'Цена',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => row.price,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'quantity',
            title: 'Количество',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => row.quantity,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'summary',
            title: 'Сумма',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            onSort: (col) => onSortColumn(col),
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
            key: 'categories',
            title: 'Категории',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => (row.categories as ICategory[]).reduce((acc, c, i, arr) => {
                acc += c.title
                if (i + 1 !== arr.length) acc += ', '

                return acc
            }, ''),
        },
        {
            key: 'seo',
            title: 'SEO',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IProduct) => row.seo.title,
        },
    ])

    return {
        cols,
        totalLength,
        products,
        onEditRow,
        onCreateRow,
        onSortColumn,
        onUpdateTablePage,
        onUpdateTableRowsCount,
    }
}
