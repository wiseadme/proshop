import { ref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'

export const useProductsTable = () => {
    const { pagination, sort, getProducts } = useProductsService()

    const onUpdateTablePage = async (page) => {
        pagination.setPage(page)
        await getProducts({})
    }

    const onUpdateTableRowsCount = async (count) => {
        pagination.setItemsCount(count)
    }

    const onSortColumn = (col) => {
        const { sorted } = col
        sorted ? sort.setAsc(col.key) : sort.setDesc(col.key)

        setTimeout(() => getProducts())
    }

    const cols = ref([
        {
            key: 'actions',
            title: 'Действия',
            align: 'center'
        },
        {
            key: 'name',
            title: 'Название',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.name,
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'url',
            title: 'Url товара',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.url,
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'price',
            title: 'Цена',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.price,
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'quantity',
            title: 'Количество',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.quantity
        },
        {
            key: 'summary',
            title: 'Сумма',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
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
            format: (row) => row.categories.reduce((acc, c, i, arr) => {
                acc += c.title
                if (i + 1 !== arr.length) acc += ', '

                return acc
            }, '')
        },
        {
            key: 'seo',
            title: 'SEO',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.seo.title
        }
    ])

    return {
        cols,
        onSortColumn,
        onUpdateTablePage,
        onUpdateTableRowsCount
    }
}
