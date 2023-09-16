import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOptionService } from '../types/service'
import { IOption } from '@proshop/types'
import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { OptionDTO } from '@modules/option/dto/option.dto'

@injectable()
export class OptionController extends BaseController implements IController {
    public path = '/api/v1/options'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IOptionService) private service: IOptionService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', new ValidateMiddleware(OptionDTO).execute(), expressAsyncHandler(this.createOption.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateOption.bind(this)))
        this.router.get('/', expressAsyncHandler(this.getOptions.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteOption.bind(this)))
    }

    async createOption({ body, method }: Request<{}, {}, IOption>, res: Response) {
        try {
            const option = await this.service.create(body)

            this.send({
                response: res,
                data: option,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async getOptions({ query, method }: Request<{}, {}, {}, { id?: string }>, res: Response) {
        try {
            const options = await this.service.find(query?.id)

            this.send({
                response: res,
                data: options,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async updateOption({ body, method }: Request<{}, {}, IOption & Document>, res: Response) {
        try {
            const { updated } = await this.service.update(body)

            this.send({
                response: res,
                data: updated,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteOption({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
        try {
            await this.service.delete(query.id)
            this.send({
                response: res,
                data: null,
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
}
