import { api } from '~/plugins/axios'

export const fetchCategories = () => api.get('/v1/categories')
