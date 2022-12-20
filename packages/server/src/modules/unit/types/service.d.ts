import { Document } from 'mongoose'
import { IUnit } from '@ecommerce-platform/types'

export interface IUnitService {
  create(unit: IUnit): Promise<Document & IUnit>

  read(id?: string): Promise<Array<Document & IUnit>>

  delete(id: string): Promise<boolean>
}
