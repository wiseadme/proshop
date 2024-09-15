import { useSharedHttp } from '@shared/composables/use-http'

import { ICategory, ICategoryParams } from '@proshop-app/types'

export const useCategoryRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createCategory = (category: ICategory) => request<ICategory>({
        url: '/api/v1/category',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: category
    })

    const getCategories = (params: Partial<ICategory> = {}) => request<ICategory[]>({
        url: '/api/v1/category',
        params
    })

    const updateCategory = (updates: Partial<ICategoryParams>) => request<ICategory>({
        url: '/api/v1/category',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates,
    })

    const deleteCategory = (id: string) => request<boolean>({
        url: '/api/v1/category',
        method: 'DELETE',
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
