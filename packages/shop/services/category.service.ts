import { ref } from '@nuxtjs/composition-api'
import { useCategoryRepository, Repository } from '~/repository/category.repository'

class Service {
  public categories = ref<any[]>(null)
  public category = ref(null)
  private repository: Repository
  static instance: Service

  constructor(repository) {
    this.repository = repository
  }

  setCurrentCategory(category) {
    this.category.value = category
  }

  async fetchCategories() {
    try {
      const { data } = await this.repository.getCategories()
      this.categories.value = data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static create() {
    if (Service.instance) {
      return Service.instance
    }
    const repository = useCategoryRepository()
    Service.instance = new Service(repository)
    return Service.instance
  }
}

export const useCategoryService = () => Service.create()
