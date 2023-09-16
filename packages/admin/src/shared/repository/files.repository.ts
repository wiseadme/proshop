import { file, rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
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

interface IFilesRepository extends Omit<() => IRepository<IAsset>, 'read' | 'update'> {
  create: (params: CreateFileParams) => Promise<{ data: { data: any } }>
  update: (updates: Partial<IAsset>) => Promise<{ data: { data: IAsset } }>
  delete: (params: DeleteFileParams) => Promise<{ data: { data: boolean } }>
}

class Repository implements IFilesRepository {
  filesClient: IRest<IAsset>
  client: IRest<IAsset>
  path: string

  constructor({ filesClient, client, path }){
      this.filesClient = filesClient
      this.client = client
      this.path = path
  }

  create({ ownerId, fileName, formData }){
      return this.filesClient.post(`${ this.path }?id=${ ownerId }&&fileName=${ fileName }`, formData)
  }

  update(updates){
      return this.client.patch(this.path, updates)
  }

  delete(asset){
      return this.client.delete(this.path, { params: { ...asset } })
  }
}

export const useFilesRepository = () => new Repository({
    filesClient: file.client,
    client: rest.client,
    path: '/api/v1/assets'
}) as IFilesRepository
