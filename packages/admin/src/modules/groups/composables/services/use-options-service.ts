import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import { useOptionsRepository } from '@modules/groups/composables/repository/use-options-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { useLogger } from '@shared/utils/logger'

import type { IOption } from '@proshop-app/types'

export const useOptionsService = createSharedComposable(() => {
    const repository = useOptionsRepository()
    const { logError } = useLogger()

    const _options = ref<IOption[]>([])

    const createOption = async (option: IOption) => {
        try {
            const { data } = await repository.createOption(option)

            unref(_options).push(data)

            return data
        } catch (err) {
            logError('Options Service: option creating failed', err)

            return Promise.reject(err)
        }
    }

    const getOptions = async (params: Partial<IOption> = {}) => {
        try {
            const { data } = await repository.getOptions(params)

            _options.value = data
        } catch (err) {
            logError('Options Service: options fetching failed', err)

            return Promise.reject(err)
        }
    }

    const updateOption = async (option: Partial<IOption>) => {
        try {
            const { data } = await repository.updateOption(option)

            _options.value = unref(_options).reduce((acc, it) => {
                acc.push(it.id === option.id ? data : it)

                return acc
            }, [] as IOption[])

            return data
        } catch (err) {
            logError('Options Service: option updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteOption = async (id: string) => {
        try {
            const { data } = await repository.deleteOption(id)

            _options.value = unref(_options).filter((option) => option.id !== id)

            return data
        } catch (err) {
            logError('Options Service: option deleting failed', err)

            return Promise.reject(err)
        }
    }

    const clearOptions = () => {
        _options.value = []
    }

    return {
        options: _options as Ref<DeepReadonly<IOption>[]>,
        createOption,
        getOptions,
        updateOption,
        deleteOption,
        clearOptions,
        cancelRequests: repository.cancel
    }
})
