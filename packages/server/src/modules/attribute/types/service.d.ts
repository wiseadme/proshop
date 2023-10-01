import { Document } from 'mongoose'
import { IAttribute } from '@proshop/types'
import { id } from 'inversify'

export interface IAttributeService {
    create(attribute: IAttribute): Promise<IAttribute>

    read(id?: string): Promise<IAttribute[]>,

    update(updates: Partial<IAttribute>): Promise<IAttribute | IAttribute[]>

    delete(id: string): Promise<boolean>
}
