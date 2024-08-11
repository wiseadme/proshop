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
        method: 'POST',
        body: attr
    })

    const getAttributes = (params: Partial<IAttribute> = {}) => request({
        url: '/api/v1/attribute',
        params,
    })

    const updateAttribute = (updates: IAttribute[]) => request({
        url: '/api/v1/attribute',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates,
    })

    const deleteAttribute = (id: string) => request({
        url: '/api/v1/attribute',
        method: 'DELETE',
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
