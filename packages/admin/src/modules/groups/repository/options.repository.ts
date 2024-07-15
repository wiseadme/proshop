import { AxiosResponse } from 'axios'

import type { IOption } from '@proshop-app/types'

import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'

interface IOptionsRepository {
    createOption(option: IOption): Promise<AxiosResponse<{ data: IOption, ok: boolean }>>

    getOptions(params: Partial<IOption>): Promise<AxiosResponse<{ data: IOption[], ok: boolean }>>

    updateOption(option: Partial<IOption>): Promise<AxiosResponse<{ data: IOption, ok: boolean }>>

    deleteOption(id: string): Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

export class Repository implements IOptionsRepository {
    client: IRest<IOption>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    async createOption(option: IOption): Promise<AxiosResponse<{ data: IOption, ok: boolean }>> {
        return this.client.post(this.path, option)
    }

    async getOptions(params: Partial<IOption>): Promise<AxiosResponse<{ data: IOption[]; ok: boolean; }>> {
        return this.client.get(this.path, { params })
    }

    async updateOption(updates: Partial<IOption>): Promise<AxiosResponse<{ data: IOption; ok: boolean; }, any>> {
        return this.client.patch(this.path, updates)
    }

    async deleteOption(id: string): Promise<AxiosResponse<{ data: boolean; ok: boolean }>> {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useOptionsRepository = () => new Repository({
    client: rest,
    path: '/api/v1/options'
})
