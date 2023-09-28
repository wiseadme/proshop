import { file, rest } from '@shared/api'
import { IRest } from '@shared/types/app'
import { IAsset } from '@proshop/types'

type CreateFileParams = {
    ownerId: string,
    fileName: string,
    formData: FormData
}

type DeleteFileParams = {
    ownerId: string,
    url: string,
}

interface IFilesRepository {
    createAsset: (params: CreateFileParams) => Promise<{ data: { data: any } }>
    updateAsset: (updates: Partial<IAsset>) => Promise<{ data: { data: IAsset } }>
    deleteAsset: (params: DeleteFileParams) => Promise<{ data: { data: boolean } }>
}

class Repository implements IFilesRepository {
    filesClient: IRest<IAsset>
    client: IRest<IAsset>
    path: string

    constructor({ filesClient, client, path }) {
        this.filesClient = filesClient
        this.client = client
        this.path = path
    }

    createAsset({ ownerId, fileName, formData }) {
        return this.filesClient.post(`${this.path}?id=${ownerId}&&fileName=${fileName}`, formData)
    }

    updateAsset(updates: Partial<IAsset>) {
        return this.client.patch(this.path, updates)
    }

    updateMany(assets: Partial<IAsset>[]) {
        return this.client.patch(`${this.path}/many`, assets)
    }

    deleteAsset(asset: IAsset) {
        return this.client.delete(this.path, { params: { ...asset } })
    }
}

export const useFilesRepository = () => new Repository({
    filesClient: file.client,
    client: rest.client,
    path: '/api/v1/assets',
})
