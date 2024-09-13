import { useFilesRepository } from '@shared/composables/repository/use-files-repository'

import { IAsset } from '@proshop-app/types'


const repository = useFilesRepository()

export const actions = {
    async uploadFile({ dir, fileName, formData }) {
        try {
            const { data } = await repository.createAsset({ dir, fileName, formData })
            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates: Partial<IAsset>) {
        try {
            const { data } = await repository.updateAsset(updates)
            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateMany(assets: IAsset[]) {
        try {
            const { data } = await repository.updateManyAssets(assets)
            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteFile(asset: IAsset) {
        try {
            const { data } = await repository.deleteAsset(asset)
            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
