import { api } from '~/plugins/axios'

export const fetchProductsByCategory = (categoryId) => api.get('/v1/products', { params: { category: categoryId } })
