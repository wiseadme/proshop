import cors from 'cors'
import { ICorsMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'
import { config } from '@app/config'

@injectable()
export class CorsMiddleware implements ICorsMiddleware {
    public bind: boolean = true
    public execute: ReturnType<typeof cors> = cors({
        origin: config.websiteUrl,
        optionsSuccessStatus: 200,
    })
}

