import { useSharedHttp } from '@shared/composables/use-http'

import { IMerchant } from '@proshop-app/types'


export const useMerchantRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createMerchant = (merchant: IMerchant) => request<IMerchant>({
        url: '/api/v1/settings/merchant',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: merchant,
    })

    const getMerchant = () => request<IMerchant>({
        url: '/api/v1/settings/merchant',
    })

    const updateMerchant = (merchant: Partial<IMerchant>) => request<IMerchant>({
        url: '/api/v1/settings/merchant',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: merchant,
    })

    const deleteMerchant = () => request<boolean>({
        url: '/api/v1/settings/merchant',
        method: 'DELETE'
    })

    return {
        createMerchant,
        getMerchant,
        updateMerchant,
        deleteMerchant,
        cancel
    }
}
