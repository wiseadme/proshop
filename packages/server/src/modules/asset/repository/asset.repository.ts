import * as fs from 'fs/promises'
import rimraf from 'rimraf'
import mongoose, { HydratedDocument } from 'mongoose'
import { inject, injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'

import { TYPES } from '@common/schemes/di-types'
import { AssetModel } from '@modules/asset/model/asset.model'
import { config } from '@app/config'
// Types
import { Request, Response } from 'express'
import type { IAsset, IAssetMongoModel } from '@proshop-app/types'
import { IAssetsRepository } from '../types/repository'
import { AssetsResponse } from '../types/params'
import { IFileLoaderMiddleware } from '@/types/middlewares'

import { AssetMapper } from '@modules/asset/mappers/asset.mapper'

@injectable()
export class AssetRepository implements IAssetsRepository {
    constructor(
        @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware,
    ) {
    }

    save(req: Request, res: Response): Promise<AssetsResponse> {
        const upload = this.fileLoader.loadSingle('image')
        const ownerId = req.query.id as string
        const ownerDir = ownerId.slice(-10)

        const assetId = new mongoose.Types.ObjectId()
        const { fileName } = req.query
        const url = `/uploads/${ownerDir}/${assetId.toString()}|${fileName}`

        req.query.assetId = assetId.toString()
        req.query.ownerDir = ownerDir

        return new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) return reject(err)

                new AssetModel({
                    _id: assetId,
                    ownerId,
                    fileName,
                    url,
                })
                    .save()
                    .then((asset) => resolve(AssetMapper.toDomain(asset.toObject())))
            })
        })
    }

    async update(updates: Partial<IAsset>) {
        validateId(updates.id!)

        const updated = await AssetModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IAssetMongoModel

        return AssetMapper.toDomain(updated)
    }

    async updateMany(assets: Partial<IAsset>[]) {
        const asset = assets[0]

        validateId(asset.id!)

        for await (const asset of assets) {
            await AssetModel.findByIdAndUpdate({ _id: asset.id }, asset)
        }

        return true
    }

    async deleteOne(asset: IAsset) {
        validateId(asset.id)

        const assetData = await AssetModel.findOne({ _id: asset.id })
        const ownerDir = asset.ownerId.slice(-10)
        const dirPath = `${config.uploadsDir}/${ownerDir}`

        await assetData!.deleteOne()

        await fs
            .unlink(`${dirPath}/${assetData!.id}|${assetData!.fileName}`)
            .catch(err => console.log(err))

        const dir = await fs.readdir(dirPath)

        if (!dir.length) {
            rimraf(dirPath, () => console.log(dirPath, 'deleted'))
        }

        return true
    }

    async deleteAll(id: string) {
        try {
            validateId(id)

            const assets = await AssetModel.find({ ownerId: id }) as HydratedDocument<IAsset>[]
            const ownerDir = id.slice(-10)
            const dirPath = `${config.uploadsDir}/${ownerDir}`

            for await (const data of assets) {
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
