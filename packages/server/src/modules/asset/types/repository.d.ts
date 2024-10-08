import { Request, Response } from 'express'
import { IAsset } from '@proshop-app/types'
import { AssetsResponse } from './params'

export interface IAssetsRepository {
    save(req: Request, res: Response): Promise<AssetsResponse>

    update(updates: Partial<IAsset>): Promise<IAsset>

    updateMany(updates: Partial<IAsset>[]): Promise<boolean>

    deleteOne(asset: IAsset): Promise<boolean>

    deleteAll(id: string): Promise<boolean>
}
