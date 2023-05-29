import { Document } from 'mongoose'
import { IOption } from '@proshop/types'

export interface IOptionService {
    create(option: IOption): Promise<Document & IOption>

    read(id?: string): Promise<Array<Document & IOption>>,

    update(updates: Partial<IOption>): Promise<{ updated: Document & IOption }>

    delete(id: string): Promise<boolean>
}
