import { Document } from 'mongoose'
import { IOption } from '@proshop/types'
import { id } from 'inversify'

export interface IOptionRepository {
    create(option: IOption): Promise<IOption>

    find(params?: Partial<IOption>): Promise<IOption[]>

    findById(id: string): Promise<IOption>

    findMany(ids: string[]): Promise<IOption[]>

    update(updates: Partial<IOption>): Promise<IOption>

    delete(id: string): Promise<boolean>
}
