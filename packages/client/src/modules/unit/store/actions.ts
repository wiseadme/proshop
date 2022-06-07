import { useUnitRepository } from '../repository/unit.repository'

const repository = useUnitRepository()

export const actions: IUnitActions = {
  async create(unit: IUnit): Promise<IUnit>{
    try {
      const { data } = await repository.create(unit)
      this.units.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string): Promise<Array<IUnit>>{
    try {
      const { data } = await repository.read(id)
      this.units = data.data
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id: string): Promise<boolean>{
    try {
      const { data } = await repository.delete(id)
      return data.data as boolean
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
