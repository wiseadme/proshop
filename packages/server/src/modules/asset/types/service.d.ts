import { Request, Response } from 'express'
import { IAsset } from '@ecommerce-platform/types'

export interface IAssetsService {
  saveFile(req: Request, res: Response): Promise<{ url: string }>

  updateFile(updates: Partial<IAsset>): Promise<{ updated: IAsset }>

  deleteFile(params: { id: string, url: string }): Promise<boolean>
}