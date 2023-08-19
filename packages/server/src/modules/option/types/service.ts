import { Document } from 'mongoose'
import { IOption } from '@proshop/types'

export interface IOptionService {
    create(option: IOption): Promise<IOption>

    find(id?: string): Promise<IOption[] | IOption>,

    findMany(ids: string[]): Promise<IOption[]>

    update(updates: Partial<IOption>): Promise<{ updated: IOption }>

    delete(id: string): Promise<boolean>
}
