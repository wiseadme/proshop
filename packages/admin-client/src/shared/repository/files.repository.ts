import { file, rest } from '@shared/api'
import { IRest, IRepository } from '@shared/types/app'
import {IProductAsset} from '@modules/orders/types'

type CreateFileParams = {
  ownerId: string,
  fileName: string,
  formData: FormData
}

type DeleteFileParams = {
  ownerId: string,
  url: string,
}

interface IFilesRepository extends Omit<() => IRepository, 'read' | 'update'> {
  create: (params: CreateFileParams) => Promise<{ data: { data: any } }>
  update: (updates: Partial<IProductAsset>) => Promise<{ data: { data: IProductAsset } }>
  delete: (params: DeleteFileParams) => Promise<{ data: { data: boolean } }>
}

class Repository implements IFilesRepository {
  private _file: IRest
  private _rest: IRest
  private _baseUrl: string

  constructor(file, rest, baseUrl){
    this._file = file
    this._rest = rest
    this._baseUrl = baseUrl
  }

  create({ ownerId, fileName, formData }){
    return this._file.post(`${ this._baseUrl }?id=${ ownerId }&&fileName=${ fileName }`, formData)
  }

  update(updates){
    return this._rest.patch(this._baseUrl, updates)
  }

  delete({ ownerId, url }){
    return this._file.delete(`${ this._baseUrl }?id=${ ownerId }&&url=${ url }`)
  }
}

export const useFilesRepository = () => new Repository(file, rest, '/v1/assets') as IFilesRepository
