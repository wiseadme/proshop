import * as fs from 'fs/promises'
import rimraf from 'rimraf'
import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'

import { TYPES } from '@common/schemes/di-types'
import { AssetModel } from '@modules/asset/model/asset.model'
import config from '@app/config'
// Types
import { Request, Response } from 'express'
import { IAssetsRepository } from '../types/repository'
import { AssetsResponse } from '../types/params'
import { IAssetItem } from '../types/model'
import { IFileLoaderMiddleware } from '@/types/middlewares'

@injectable()
export class AssetRepository implements IAssetsRepository {
  constructor(
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
  }

  save(req: Request, res: Response): Promise<AssetsResponse>{
    return new Promise((resolve, reject) => {
      const upload = this.fileLoader.loadSingle('image')
      const ownerId = req.query.id as string
      const ownerDir = ownerId.slice(-4)

      const assetId = new mongoose.Types.ObjectId()

      const { fileName } = req.query

      const url = `/uploads/${ ownerDir }/${ assetId.toString() }|${ fileName }`

      req.query.assetId = assetId.toString()
      req.query.ownerDir = ownerDir

      try {
        upload(req, res, (err, filename) => console.log(err, filename))
      } catch (err) {
        reject(err)
      }

      new AssetModel({
        _id: assetId,
        ownerId,
        fileName,
        url
      })
        .save()
        .then(resolve)
    })
  }

  async update(updates){
    validateId(updates._id)

    const updated = await AssetModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as IAssetItem

    return { updated }
  }

  async deleteOne(asset){
    validateId(asset._id)

    const assetData = await AssetModel.findOne({ _id: asset._id })
    const ownerDir = asset.ownerId.slice(-4)
    const dirPath = `${ config.uploadsDir }/${ ownerDir }`

    await assetData!.deleteOne()

    await fs
      .unlink(`${ dirPath }/${ asset._id }|${ asset.fileName }`)
      .catch(err => console.log(err))

    const dir = await fs.readdir(dirPath)

    if (!dir.length) {
      rimraf(dirPath, () => console.log(dirPath, 'deleted'))
    }

    return true
  }

  async deleteAll(id){
    try {
      validateId(id)

      const assets = await AssetModel.find({ ownerId: id })
      const ownerDir = id.slice(-4)
      const dirPath = `${ config.uploadsDir }/${ ownerDir }`

      for (const data of assets) {
        await data.deleteOne()
      }

      rimraf(dirPath, () => console.log(dirPath, 'deleted'))

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
