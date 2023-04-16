import { Document } from 'mongoose'
import { ICurrency } from '@ecommerce-platform/types'

export interface ICurrencyService {
  create(currency: ICurrency): Promise<Document & ICurrency>

  read(params: Partial<ICurrency>): Promise<Array<Document & ICurrency>>

  update(updates: Partial<ICurrency>): Promise<{ updated: Document & ICurrency }>

  delete(id: string): Promise<boolean>
}
