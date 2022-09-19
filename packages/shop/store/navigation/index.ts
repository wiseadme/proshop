import { ref } from '@nuxtjs/composition-api'
import { fetchCategories } from '~/api/categories'

export const useNavigationStore = () => ({
  id: 'NAVIGATION',
  state: {
    categories: ref(null)
  },

  async fetchCategories(){
    try {
      const { data } = await fetchCategories()
      this.state.categories.value = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
})
