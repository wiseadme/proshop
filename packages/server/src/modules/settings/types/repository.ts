import { Document } from 'mongoose'
import { IMerchant } from '@ecommerce-platform/types'

export interface IMerchantRepository {
  create(merchant: IMerchant): Promise<Document & IMerchant>

  read(params: Partial<IMerchant>): Promise<Array<Document & IMerchant>>

  update(updates: Partial<IMerchant>): Promise<{ updated: Document & IMerchant }>

  delete(id: string): Promise<boolean>
}
