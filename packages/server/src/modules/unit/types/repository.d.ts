import { IUnit } from '@ecommerce-platform/types'
import { Document } from 'mongoose'

export interface IUnitRepository {
  create(unit: IUnit): Promise<Document & IUnit>

  read(params: Partial<IUnit>): Promise<Array<Document & IUnit>>

  update(updates: Partial<IUnit>): Promise<{ updated: Document & IUnit }>

  delete(id: string): Promise<boolean>
}
