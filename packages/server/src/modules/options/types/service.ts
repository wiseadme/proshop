import { Document } from 'mongoose'
import { IOption } from '@proshop/types'
import { id } from 'inversify'

export interface IOptionService {
    createOption(option: IOption): Promise<IOption>

    findOptions(params: Partial<IOption>): Promise<IOption[] | IOption>,

    updateOption(updates: Partial<IOption>): Promise<IOption>

    deleteOption(id: string): Promise<boolean>
}
