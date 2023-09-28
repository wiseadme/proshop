import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
// Types
import { IAsset } from '@proshop/types'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAssetsService } from '../types/service'
// import { AssetDTO } from '../dto/asset.dto'
// import { ValidateMiddleware } from '@common/middlewares/validate.middleware'

@injectable()
export class AssetController extends BaseController implements IController {
    path = '/api/v1/assets'
    router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IAssetsService) private service: IAssetsService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', /*new ValidateMiddleware(AssetDTO).execute*/ expressAsyncHandler(this.uploadAsset.bind(this)))
        this.router.patch('/', /*new ValidateMiddleware(AssetDTO).execute,*/ expressAsyncHandler(this.updateAsset.bind(this)))
        this.router.patch('/many', /*new ValidateMiddleware(AssetDTO).execute,*/ expressAsyncHandler(this.updateAssets.bind(this)))
        this.router.delete('/', /*new ValidateMiddleware(AssetDTO).execute,*/ expressAsyncHandler(this.deleteImage.bind(this)))
    }

    async uploadAsset(req: Request, res: Response) {
        try {
            const data = await this.service.saveFile(req, res)

            this.send({
                response: res,
                url: this.path,
                method: req.method,
                data,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method: req.method,
            })
        }
    }

    async updateAsset({ body, method }: Request<{}, {}, Partial<IAsset>>, res: Response) {
        try {
            const { updated } = await this.service.updateFile(body)

            this.send({
                response: res,
                data: updated,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async updateAssets({ body, method }: Request<{}, {}, Partial<IAsset>[]>, res: Response) {
        try {
            const result = await this.service.updateMany(body)

            this.send({
                response: res,
                data: result,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteImage(req: Request<{}, {}, {}, { id: string, url: string }>, res: Response) {
        try {
            const result = await this.service.deleteFile(req.query)

            this.send({
                response: res,
                data: result,
                url: this.path,
                method: req.method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method: req.method,
            })
        }
    }
}
