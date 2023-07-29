import { Document } from 'mongoose'
import { IOption } from '@proshop/types'

export interface IOptionService {
    create(option: IOption): Promise<IOption>

    read(id?: string): Promise<IOption[] | IOption>,

    update(updates: Partial<IOption>): Promise<{ updated: IOption }>

    delete(id: string): Promise<boolean>
}
