import { Document } from 'mongoose'
import { IOption } from './model'

export interface IOptionRepository {
  create(option: IOption): Promise<Document>

  read(id?: string): Promise<Array<Document & IOption>>

  update(updates: Array<IOption & Document>): Promise<{ updated: Array<Document<IOption>> }>

  delete(id: string): Promise<boolean>
}
