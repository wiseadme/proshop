import { useSharedHttp } from '@shared/composables/use-http'

import { IOption } from '@proshop-app/types'

export const useOptionsRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createOption = (option: IOption) => request({
        url: '/api/v1/options',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: option
    })

    const getOptions = (params: Partial<IOption>) => request({
        url: '/api/v1/options',
        credentials: 'same-origin',
        cache: 'no-cache',
        params
    })

    const updateOption = (updates: Partial<IOption>) => request({
        url: '/api/v1/options',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates
    })

    const deleteOption = (id: string) => request({
        url: '/api/v1/options',
        method: 'DELETE',
        credentials: 'same-origin',
        cache: 'no-cache',
        params: { id }
    })

    return {
        createOption,
        getOptions,
        updateOption,
        deleteOption,
        cancel
    }
}
