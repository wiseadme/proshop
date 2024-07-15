import { IOption } from '@proshop-app/types'

export interface IOptionRepository {
    create(option: IOption): Promise<IOption>

    find(params?: Partial<IOption>): Promise<IOption[]>

    update(updates: Partial<IOption>): Promise<IOption>

    delete(id: string): Promise<boolean>
}
