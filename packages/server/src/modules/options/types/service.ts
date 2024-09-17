import { IOption } from '@proshop-app/types'

export interface IOptionService {
    createOption(option: IOption): Promise<IOption>

    findOptions(params: Partial<IOption>): Promise<IOption[]>

    findManyOptions(ids: string): Promise<IOption[]>

    updateOption(updates: Partial<IOption>): Promise<IOption>

    deleteOption(id: string): Promise<boolean>
}
