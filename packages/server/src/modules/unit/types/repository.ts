import { IUnit } from '@proshop-app/types'

export interface IUnitRepository {
    create(unit: IUnit): Promise<IUnit>

    read(params: Partial<IUnit>): Promise<IUnit[]>

    update(updates: Partial<IUnit>): Promise<IUnit>

    delete(id: string): Promise<boolean>
}
