import { ref } from 'vue'
import {
    PAGINATION_DEFAULT_ITEMS_COUNT,
    PAGINATION_DEFAULT_PAGE_NUMBER
} from '@shared/constants/pagination'

export const usePagination = () => {
    const page = ref(PAGINATION_DEFAULT_PAGE_NUMBER)
    const count = ref(PAGINATION_DEFAULT_ITEMS_COUNT)

    const setPage = (value: number) => {
        page.value = value
    }

    const setItemsCount = (value: number) => {
        count.value = value
    }

    return {
        page,
        count,
        setPage,
        setItemsCount
    }
}
