import { useFilesStore } from '@shared/store/files'

export class Service {
  private _store: any

  constructor(store){
      this._store = store
  }

  createFormData(file){
      const formData = new FormData()
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

  async deleteFile(asset){
      return await this._store.deleteFile(asset)
  }
}

export const useFilesService = () => new Service(useFilesStore())
