import { useCategoryRepository } from '@modules/category/repository/category.repository'
import { ICategory } from '@proshop/types'

const categoryRepository = useCategoryRepository()

export const actions = {
    async create(category: ICategory) {
        try {
            const { data } = await categoryRepository.create(category)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates) {
        try {
            const { data } = await categoryRepository.update(updates)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params = null) {
        try {
            const { data } = await categoryRepository.read(params)

            this.$patch(state => {
                if (!params) {
                    state.categories = data?.data
                } else {
                    state.category = data?.data
                }
            })

            return data?.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id) {
        try {
            const { data } = await categoryRepository.delete(id)

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
