import { Document, LeanDocument } from 'mongoose'
import { IMerchant } from '@ecommerce-platform/types'

export interface IMerchantRepository {
  create(merchant: IMerchant): Promise<Document & IMerchant>

  read(): Promise<Array<LeanDocument<IMerchant>>>

  update(updates: Partial<IMerchant>): Promise<{ updated: Document & IMerchant }>

  delete(id: string): Promise<boolean>
}
