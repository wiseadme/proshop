import { ref } from '@nuxtjs/composition-api'
import { useProductRepository, Repository } from '~/repository/product.repository'

class Service {
  public products = ref(null)
  public product = ref(null)
  private repository: Repository
  static instance: Service

  constructor(repository) {
    this.repository = repository
  }

  async fetchCategoryProducts(categoryId) {
    try {
      const { data } = await this.repository.getCategoryProducts(categoryId)
      this.products.value = data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static create() {
    if (Service.instance) {
      return Service.instance
    }
    const repository = useProductRepository()
    Service.instance = new Service(repository)
    return Service.instance
  }
}

export const useProductService = () => Service.create()
