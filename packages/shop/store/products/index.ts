import { ref } from '@nuxtjs/composition-api'
import { fetchProductsByCategory } from '~/api/products'

export const useProductsStore = () => ({
  state: {
    products: ref(null)
  },
  async fetchCategoryProducts(category){
    try {
      const { data } = await fetchProductsByCategory(category)
      this.state.products.value = data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
})
