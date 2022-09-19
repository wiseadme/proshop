import { ref } from '@nuxtjs/composition-api'
import { fetchCategories } from '~/api/categories'

export const useNavigationStore = () => ({
  id: 'NAVIGATION',
  state: {
    categories: ref(null),
    category: ref(null)
  },

  setCurrentCategory(category) {
    console.log(category)
    this.state.category.value = category
  },

  async fetchCategories(){
    try {
      const { data } = await fetchCategories()
      this.state.categories.value = data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
})
