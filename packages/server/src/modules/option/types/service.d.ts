import { Document } from 'mongoose'
import { IOption } from './model'

export interface IOptionService {
  create(option: IOption): Promise<Document<IOption>>

  read(id?: string): Promise<Array<Document<IOption>>>,

  update(updates: Array<IOption & Document>): Promise<{ updated: Array<Document<IOption>> }>

  delete(id: string): Promise<boolean>
}
