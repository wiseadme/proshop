import mkdirp from 'mkdirp'
import multer, { Multer, Options } from 'multer'
import { injectable } from 'inversify'
import { IFileLoaderMiddleware } from '@/types/middlewares'
import config from '@app/config'
import * as fs from 'fs'

type Maybe<T> = T | null

class FileLoaderOptions {
    storage: Maybe<Options['storage']>
    fileFilter: Maybe<Options['fileFilter']>
    limits: Maybe<Options['limits']>
    bind: boolean

    constructor() {
        this.storage = null
        this.fileFilter = null
        this.limits = null
        this.bind = true

        this.addOptionsStorage()
        this.addFileFilter()
        this.addLimits()
    }

    addOptionsStorage() {
        this.storage = multer.diskStorage({
            destination(req, file, cb) {
                const { ownerDir } = req.query

                try {
                    fs.readdirSync(`${config.uploadsDir}/${ownerDir}`)
                } catch (err) {
                    mkdirp.sync(`${config.uploadsDir}/${ownerDir}`)
                }

                cb(null, `${config.uploadsDir}/${ownerDir}`)
            },

            filename(req, file, cb) {
                const { fileName, assetId } = req.query

                cb(null, `${assetId}|${fileName}`)
            },
        })
    }

    addFileFilter() {
        this.fileFilter = (req, file, cb) => {
            if (
                file.mimetype === 'image/png'
                || file.mimetype === 'image/jpeg'
                || file.mimetype === 'image/jpg'
            ) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }

    addLimits() {
        this.limits = { fileSize: 1024 * 1024 * 10 }
    }
}

@injectable()
export class FileLoaderMiddleware implements IFileLoaderMiddleware {
    plugin: Multer
    bind: boolean

    constructor() {
        this.bind = true
        this.plugin = multer(new FileLoaderOptions() as Options)
    }

    loadSingle(fieldName) {
        return this.plugin.single(fieldName)
    }

    loadArray(fieldName, count) {
        return this.plugin.array(fieldName, count)
    }
}

