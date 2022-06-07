import { useFilesStore } from '@shared/store/files'

export class Service {
  private _store: any

  constructor(store){
    this._store = store
  }

  createFormData(files){
    const formData = new FormData()
    const file = files[files.length - 1]
    const fileName = file.name

    formData.append('image', file)

    return { formData, fileName }
  }

  async uploadFile({ ownerId, fileName, formData }){
    return await this._store.uploadFile({ ownerId, fileName, formData })
  }

  async updateFile(updates){
    return this._store.update(updates)
  }

  async deleteFile({ ownerId, url }){
    return await this._store.deleteFile({ ownerId, url })
  }
}

export const useFilesService = () => new Service(useFilesStore())
