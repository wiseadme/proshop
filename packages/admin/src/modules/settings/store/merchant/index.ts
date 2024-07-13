import { defineStore } from 'nervue'

import { actions } from '@modules/settings/store/merchant/actions'
import { state } from '@modules/settings/store/merchant/state'

export const useMerchantStore = defineStore({
    id: 'merchant',
    state,
    actions
})
