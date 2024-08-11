import { useSharedHttp } from '@shared/composables/use-http'

import { IAsset } from '@proshop-app/types'

export const useFilesRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createAsset = ({ ownerId, fileName, formData }) => request({
        url: '/api/v1/assets',
        headers: {
            'Accept': '*/*',
        },
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        params: { id: ownerId, fileName },
        data: formData
    })

    const updateAsset = (updates: Partial<IAsset>) => request({
        url: '/api/v1/assets',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates
    })

    const updateManyAssets = (updates: Partial<IAsset>[]) => request({
        url: '/api/v1/assets/many',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates
    })

    const deleteAsset = (asset: IAsset) => request({
        url: '/api/v1/assets',
        method: 'DELETE',
        credentials: 'same-origin',
        cache: 'no-cache',
        params: asset
    })

    return {
        createAsset,
        updateAsset,
        updateManyAssets,
        deleteAsset,
        cancel
    }
}
