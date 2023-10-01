import { Request, Response } from 'express'
import { IAsset } from '@proshop/types'

export interface IAssetsService {
    saveFile(req: Request, res: Response): Promise<{ url: string }>

    updateFile(updates: Partial<IAsset>): Promise<IAsset>

    updateMany(assets: Partial<IAsset>[]): Promise<boolean>

    deleteFile(params: { id: string, url: string }): Promise<boolean>

    deleteFiles(id: string): Promise<boolean>
}
