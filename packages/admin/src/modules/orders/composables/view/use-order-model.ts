import { ref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { Order } from '@modules/orders/model/order.model'

import type { IOrder } from '@proshop-app/types'

export const useOrderModel = createSharedComposable(() => {
    const model = ref<IOrder>(Order.create())

    const setOrderModel = (data: IOrder) => {
        model.value = data
    }

    return {
        model,
        setOrderModel
    }
})
