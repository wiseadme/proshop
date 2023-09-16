import { useCategoryRepository } from '@modules/categories/repository/category.repository'
import { ICategory } from '@proshop/types'

const categoryRepository = useCategoryRepository()

export const actions = {
    async create(category: ICategory) {
        try {
            const { data } = await categoryRepository.create(category)

            this.$patch((state) => state.categories.push(data.data))

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates) {
        try {
            const { data } = await categoryRepository.update(updates)

            this.$patch(state => {
                state.categories = state.categories.map((it) => {
                    if (it.id === data.data.id) return data.data

                    return it
                })
            })

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

            this.$patch(state => {
                state.categories = state.categories.filter(ctg => ctg.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
