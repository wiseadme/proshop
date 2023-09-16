import { Document } from 'mongoose'
import { IUnit } from '@proshop/types'

export interface IUnitService {
    create(unit: IUnit): Promise<IUnit>

    read(params: Partial<IUnit>): Promise<IUnit[]>

    update(updates: Partial<IUnit>): Promise<{ updated: IUnit }>

    delete(id: string): Promise<boolean>
}
