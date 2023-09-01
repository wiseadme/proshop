import { IUnit } from '@proshop/types'
import { Document } from 'mongoose'

export interface IUnitRepository {
    create(unit: IUnit): Promise<IUnit>

    read(params: Partial<IUnit>): Promise<IUnit[]>

    update(updates: Partial<IUnit>): Promise<{ updated: IUnit }>

    delete(id: string): Promise<boolean>
}
