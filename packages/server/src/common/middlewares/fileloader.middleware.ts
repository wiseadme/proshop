import mkdirp from 'mkdirp'
import multer, { Multer, Options } from 'multer'
import { injectable } from 'inversify'
import { IFileLoaderMiddleware } from '@/types/middlewares'
import { config } from '@app/config'
import * as fs from 'fs'

type Maybe<T> = T | null

const ALLOWED_MIME_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg']
const FILE_MAX_SIZE = 1024 * 1024 * 10

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
            if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }

    addLimits() {
        this.limits = { fileSize: FILE_MAX_SIZE }
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

    loadSingle(fieldName: string) {
        return this.plugin.single(fieldName)
    }

    loadArray(fieldName: string, count: number) {
        return this.plugin.array(fieldName, count)
    }
}

