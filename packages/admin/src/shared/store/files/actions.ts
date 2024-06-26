import { IAsset } from '@proshop/types'

import { useFilesRepository } from '@shared/repository/files.repository'

const repository = useFilesRepository()

export const actions = {
    async uploadFile({ ownerId, fileName, formData }){
        try {
            const { data } = await repository.createAsset({ ownerId, fileName, formData })
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates: Partial<IAsset>){
        try {
            const { data } = await repository.updateAsset(updates)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateMany(assets: IAsset[]) {
        try {
            const { data } = await repository.updateMany(assets)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteFile(asset: IAsset){
        try {
            const { data } = await repository.deleteAsset(asset)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
