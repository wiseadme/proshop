import { useSharedHttp } from '@shared/composables/use-http'

import { ICategory } from '@proshop-app/types'

export const useCategoryRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createCategory = (category: ICategory) => request({
        url: '/api/v1/category',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: category
    })

    const getCategories = (params: Partial<ICategory> = {}) => request({
        url: '/api/v1/category',
        credentials: 'same-origin',
        cache: 'no-cache',
        params
    })

    const updateCategory = (updates: Partial<ICategory>) => request({
        url: '/api/v1/category',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates,
    })

    const deleteCategory = (id: string) => request({
        url: '/api/v1/category',
        method: 'DELETE',
        credentials: 'same-origin',
        cache: 'no-cache',
        params: { id }
    })

    return {
        createCategory,
        getCategories,
        updateCategory,
        deleteCategory,
        cancel
    }
}
