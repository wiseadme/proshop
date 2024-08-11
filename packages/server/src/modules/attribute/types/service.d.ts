import type { IAttribute } from '@proshop-app/types'

export interface IAttributeService {
    create(attribute: IAttribute): Promise<IAttribute>

    read(id?: string): Promise<IAttribute[]>,

    update(updates: Partial<IAttribute>): Promise<IAttribute | IAttribute[]>

    delete(id: string): Promise<boolean>
}
