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

  return {
    onUpdateTablePage,
    onSortColumn,
    onUpdateTableRowsCount
  }
}
