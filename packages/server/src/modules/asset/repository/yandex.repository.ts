import rimraf from 'rimraf'
import mongoose, { HydratedDocument } from 'mongoose'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'

import { AssetModel } from '@modules/asset/model/asset.model'
// Types
import type { Request, Response } from 'express'
import type { IAsset, IAssetMongoModel } from '@proshop-app/types'
import type { IAssetsRepository } from '@modules/asset/types/repository'

import { AssetMapper } from '@modules/asset/mappers/asset.mapper'
import { s3 } from '@modules/asset/client/yandex'
import multer from 'multer'

@injectable()
export class YandexRepository implements IAssetsRepository {
    async save(req: Request, res: Response): Promise<any> {
        const upload = multer().single('image')
        const dir = req.query.dir as string

        const assetId = new mongoose.Types.ObjectId()
        const { fileName } = req.query

        return new Promise((resolve, reject) => {
            upload(req, res, async (err: any) => {
                if (err) {
                    reject(err)
                }

                const data: any = await s3.Upload({
                    buffer: req.file!.buffer,
                    name: `${assetId.toString()}|${fileName}`,
                }, dir)

                new AssetModel({
                    _id: assetId,
                    dir,
                    fileName: `${assetId.toString()}|${fileName}`,
                    url: data.Location,
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
        const ownerDir = asset.dir
        const path = `${ownerDir}/${assetData?.fileName}`

        await s3.Remove(path)

        await assetData!.deleteOne()

        return true
    }

    async deleteAll(id: string) {
        return true
    }
}
