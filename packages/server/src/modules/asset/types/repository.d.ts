import { Request, Response } from 'express'
import { IAsset } from '@ecommerce-platform/types'
import { AssetsResponse } from './params'

export interface IAssetsRepository {
    save(req: Request, res: Response): Promise<AssetsResponse>

    update(updates: Partial<IAsset>): Promise<{ updated: IAsset }>

    deleteOne(asset: IAsset): Promise<boolean>

    deleteAll(id: string): Promise<boolean>
}
