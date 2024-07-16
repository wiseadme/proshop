import { useSharedHttp } from '@shared/composables/use-http'

import { IAttribute } from '@proshop-app/types'

export const useAttributeRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createAttribute = (attr: IAttribute) => request({
        url: '/api/v1/attribute',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'same-origin',
        method: 'POST',
        cache: 'no-cache',
        body: attr
    })

    const getAttributes = (params: Partial<IAttribute> = {}) => request({
        url: '/api/v1/attribute',
        cache: 'no-cache',
        credentials: 'same-origin',
        params,
    })

    const updateAttribute = (updates: IAttribute[]) => request({
        url: '/api/v1/attribute',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates,
    })

    const deleteAttribute = (id: string) => request({
        url: '/api/v1/attribute',
        method: 'DELETE',
        cache: 'no-cache',
        credentials: 'same-origin',
        params: { id },
    })

    return {
        createAttribute,
        getAttributes,
        deleteAttribute,
        updateAttribute,
        cancel
    }
}
