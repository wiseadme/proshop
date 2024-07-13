import { defineStore } from 'nervue'

import { actions } from './actions'

const id = 'OPTIONS'

export const useOptionsStore = defineStore({ id, actions })
