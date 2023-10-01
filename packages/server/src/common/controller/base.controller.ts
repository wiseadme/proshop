import { IBaseController } from './base.controller.interface'
import { injectable } from 'inversify'
import { LoggerService } from '@common/services/logger.service'
import { ErrorOptions, SendOptions } from '@/types'

@injectable()
export abstract class BaseController implements IBaseController {
    static logger = new LoggerService()

    send({ request, response, data }: SendOptions) {
        BaseController.logger.success('response:', request.method, 200, request.originalUrl, 'success')
        response.status(200).json({
            ok: true,
            data,
        })
    }

    error({ request, error, status = 500, next }: ErrorOptions) {
        BaseController.logger.error(
            error?.status || status,
            request.method,
            request.originalUrl,
            error?.message || error,
        )

        next?.({
            ok: false,
            status: error?.status || 500,
            message: error?.message || error,
        })
    }
}
