import { Document } from 'mongoose'
import { IOption } from '@proshop/types'
import { id } from 'inversify'

export interface IOptionService {
    create(option: IOption): Promise<IOption>

    find(id?: string): Promise<IOption[] | IOption>,

    findMany(ids: string[]): Promise<IOption[]>

    update(updates: Partial<IOption>): Promise<IOption>

    delete(id: string): Promise<boolean>

    deleteVariantOptions(options: IOption[]): Promise<boolean>
}
