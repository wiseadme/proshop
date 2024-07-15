import { useUnitRepository } from '@modules/units/repository/unit.repository'

import type { IUnit } from '@proshop-app/types'

import { IUnitActions } from '@modules/units/types'


const repository = useUnitRepository()

export const actions: IUnitActions = {
    async create(unit: IUnit): Promise<IUnit> {
        try {
            const { data } = await repository.create(unit)
            this.units.push(data.data)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params: Partial<IUnit> = {}): Promise<Array<IUnit>> {
        try {
            const { data } = await repository.read(params)

            this.$patch(state => {
                state.units = data?.data
            })

            return data?.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates) {
        try {
            const { data } = await repository.update(updates)

            this.$patch(state => {
                state.units = state.units.reduce((acc, it) => {
                    acc.push(it.id === data.data.id ? data.data : it)

                    return acc
                }, [])
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { data } = await repository.delete(id)

            this.$patch(state => {
                state.units = state.units.filter(it => it.id !== id)
            })

            return data.data as boolean
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
