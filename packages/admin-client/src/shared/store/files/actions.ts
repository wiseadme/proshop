import { useFilesRepository } from '@shared/repository/files.repository'

const filesRepository = useFilesRepository()

export const actions = {
  async uploadFile({ ownerId, fileName, formData }){
    try {
      const { data } = await filesRepository.create({ ownerId, fileName, formData })
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const { data } = await filesRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async deleteFile({ ownerId, url }){
    try {
      const { data } = await filesRepository.delete({ ownerId, url })
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
