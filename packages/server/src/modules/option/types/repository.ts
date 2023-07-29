import { Document } from 'mongoose'
import { IOption } from '@proshop/types'

export interface IOptionRepository {
    create(option: IOption): Promise<IOption>

    find(params?: Partial<IOption>): Promise<IOption[]>

    findById(id: string): Promise<IOption>

    update(updates: Partial<IOption>): Promise<{ updated: IOption }>

    delete(id: string): Promise<boolean>
}
