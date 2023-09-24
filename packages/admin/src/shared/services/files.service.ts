import { useFilesStore } from '@shared/store/files'
import { IAsset } from '@proshop/types'
import { Store } from 'nervue'

export class Service {
    private _store: any

    constructor(store: Store) {
        this._store = store
    }

    createFormData(file: File) {
        const formData = new FormData()
        const fileName = file.name

        formData.append('image', file)

        return { formData, fileName }
    }

    uploadFile({ ownerId, fileName, formData }) {
        return this._store.uploadFile({ ownerId, fileName, formData })
    }

    async updateFile(updates: Partial<IAsset>): Promise<IAsset> {
        return this._store.update(updates)
    }

    async deleteFile(asset: Partial<IAsset>) {
        return this._store.deleteFile(asset)
    }
}

export const useFilesService = () => new Service(useFilesStore())
