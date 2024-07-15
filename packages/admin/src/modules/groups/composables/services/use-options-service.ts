import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useOptionsRepository } from '@modules/groups/repository/options.repository'

import { useLogger } from '@shared/utils/logger'

import type { IOption } from '@proshop-app/types'

export const useOptionsService = createSharedComposable(() => {
    const repository = useOptionsRepository()
    const { logError } = useLogger()

    const _options = ref<IOption[]>([])

    const createOption = async (option: IOption) => {
        try {
            const { data } = await repository.createOption(option)

            unref(_options).push(data.data)

            return data.data
        } catch (err) {
            logError('Options Service: option creating failed', err)

            return Promise.reject(err)
        }
    }

    const getOptions = async (params: Partial<IOption>) => {
        try {
            const { data } = await repository.getOptions(params)

            _options.value = data.data
        } catch (err) {
            logError('Options Service: options fetching failed', err)

            return Promise.reject(err)
        }
    }

    const updateOption = async (option: Partial<IOption>) => {
        try {
            const { data } = await repository.updateOption(option)

            _options.value = unref(_options).reduce((acc, it) => {
                acc.push(it.id === option.id ? data.data : it)

                return acc
            }, [] as IOption[])

            return data.data
        } catch (err) {
            logError('Options Service: option updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteOption = async (id: string) => {
        try {
            const { data } = await repository.deleteOption(id)

            _options.value = unref(_options).filter((option) => option.id !== id)

            return data.data
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
        clearOptions
    }
})
