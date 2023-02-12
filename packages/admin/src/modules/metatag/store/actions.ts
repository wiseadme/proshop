import { useMetaTagRepository } from '@modules/metatag/repository/metatag.repository'

const repository = useMetaTagRepository()

export const actions = {
  async createMetaTag(metaTag) {
    try {
      const { data } = await repository.create(metaTag)

      this.$patch(state => state.metaTags.push(data.data))

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async getMetaTags(params) {
    try {
      const { data } = await repository.read(params)

      this.$patch(state => state.metaTags = data.data)

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
