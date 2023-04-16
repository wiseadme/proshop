import { ICurrency } from '@ecommerce-platform/types'
import { Document } from 'mongoose'

export interface ICurrencyRepository {
  create(customer: ICurrency): Promise<ICurrency & Document>

  read(params: Partial<ICurrency>): Promise<(ICurrency & Document)[]>

  update(updates: Partial<ICurrency>): Promise<{ updated: ICurrency & Document }>

  delete(id: string): Promise<boolean>
}
