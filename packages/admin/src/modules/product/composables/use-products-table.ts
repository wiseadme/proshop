import { useProductService } from '@modules/product/service/product.service'

export const useProductsTable = () => {
  const service= useProductService()

  const onUpdateTablePage = async (page) => {
    service.pagination.setPaginationPage(page)
    await service.getProducts({})
  }

  const onUpdateTableRowsCount = async (count) => {
    service.pagination.setPaginationItemsCount(count)
  }

  const onSortColumn = (col) => {
    const { sorted } = col
    sorted ? service.sort.setAsc(col.key) : service.sort.setDesc(col.key)

    setTimeout(() => service.getProducts())
  }

  return {
    onUpdateTablePage,
    onSortColumn,
    onUpdateTableRowsCount
  }
}
