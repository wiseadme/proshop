import { ref } from 'vue'
import { PAGINATION_DEFAULT_ITEMS_COUNT, PAGINATION_DEFAULT_PAGE_NUMBER } from '@shared/constants/counts'

export const usePagination = () => {
  const page = ref(PAGINATION_DEFAULT_PAGE_NUMBER)
  const itemsCount = ref(PAGINATION_DEFAULT_ITEMS_COUNT)

  const setPaginationPage = (value) => {
    page.value = value
  }

  const setPaginationItemsCount = (value) => {
    itemsCount.value = value
  }

  return {
    page,
    itemsCount,
    setPaginationPage,
    setPaginationItemsCount
  }
}
