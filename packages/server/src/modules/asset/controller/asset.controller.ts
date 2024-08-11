import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
// Types
import type { IAsset } from '@proshop-app/types'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAssetsService } from '@modules/asset/types/service'
import { ASSETS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { ASSET_IOC } from '@modules/asset/di/di.types'

@injectable()
export class AssetController extends BaseController implements IController {
    path = ASSETS_MODULE_PATH
    router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ASSET_IOC.IAssetsService) private service: IAssetsService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'] }), this.uploadAsset.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateAsset.bind(this))
        this.router.patch('/many', setMiddlewares({ roles: ['root'] }), this.updateAssets.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteImage.bind(this))
    }

    async uploadAsset(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.saveFile(request, response)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateAsset(request: Request<{}, {}, Partial<IAsset>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateFile(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateAssets(request: Request<{}, {}, Partial<IAsset>[]>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateMany(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteImage(request: Request<{}, {}, {}, {
        id: string,
        url: string
    }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteFile(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
