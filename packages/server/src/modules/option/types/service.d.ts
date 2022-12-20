import { Document } from 'mongoose'
import { IOption } from '@ecommerce-platform/types'

export interface IOptionService {
  create(option: IOption): Promise<Document<IOption>>

  read(id?: string): Promise<Array<Document<IOption>>>,

  update(updates: IOption & Document): Promise<{ updated: Document<IOption> }>

  delete(id: string): Promise<boolean>
}
