import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'
import { AppState } from '@shared/types/app'

export const useAppStore = defineStore<string, AppState, {}, {}>('app', { state, actions })
