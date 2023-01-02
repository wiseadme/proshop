import { ref } from 'vue'

export const usePagination = () => {
  const page = ref(1)
  const itemsCount = ref(5)

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
