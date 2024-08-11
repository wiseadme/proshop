import { ref } from 'vue'

// Composables
import { useRouter } from 'vue-router'

import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

// Enums
// Types
import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { ICategory, IProduct } from '@proshop-app/types'

// Constants
import { PRODUCT_DELETED, PRODUCT_DELETE_ERROR } from '@modules/products/constants/notifications'
import { INFO_BLOCK } from '@modules/products/constants/sections'
import { RouteNames } from '@modules/products/enums/route-names'
import { CREATE, EDIT } from '@shared//constants/actions'

export const useProductsTable = () => {
    const router = useRouter()

    const {
        pagination,
        sort,
        totalLength,
        products,
        deleteProduct,
        getProducts,
    } = useProductsService()

    const { setCurrentProduct } = useProduct()
    const { setProductModel } = useProductModel()
    const { notify } = useNotifications()

    const onUpdateTablePage = (page: number) => {
        pagination.setPage(page)

        return getProducts()
    }

    const onUpdateTableRowsCount = (count: number) => {
        pagination.setPage(1)
        pagination.setItemsCount(count)
    }

    const onDeleteRow = async (row: IProduct) => {
        try {
            await deleteProduct(row)

            notify(PRODUCT_DELETED)
        } catch (err) {
            notify(PRODUCT_DELETE_ERROR)
        }
    }

    const onSortColumn = (col) => {
        const { sorted } = col
        sorted ? sort.setAsc(col.key) : sort.setDesc(col.key)

        setTimeout(getProducts)
    }

    const onEditRow = (row: IProduct) => {
        setProductModel(row)

        return router.push({
            name: RouteNames.PRODUCT_EDIT,
            params: {
                action: EDIT,
                sku: row.sku,
                section: INFO_BLOCK,
            },
        })
    }

    const onCreateRow = () => {
        setProductModel(null)
        setCurrentProduct(null)

        return router.push({
            name: RouteNames.PRODUCT_EDIT,
            params: {
                action: CREATE,
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
            filterable: false,
            format: (row: IProduct) => row.name,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'sku',
            title: 'SKU',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: false,
            format: (row: IProduct) => row.sku,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'price',
            title: 'Цена',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: false,
            format: (row: IProduct) => row.price,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'quantity',
            title: 'Количество',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: false,
            format: (row: IProduct) => row.quantity,
            onSort: (col) => onSortColumn(col),
        },
        {
            key: 'summary',
            title: 'Сумма',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: false,
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
            filterable: false,
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
            filterable: false,
            format: (row: IProduct) => row.seo.title,
        },
    ])

    return {
        cols,
        totalLength,
        products,
        onEditRow,
        onCreateRow,
        onDeleteRow,
        onSortColumn,
        onUpdateTablePage,
        onUpdateTableRowsCount,
    }
}
