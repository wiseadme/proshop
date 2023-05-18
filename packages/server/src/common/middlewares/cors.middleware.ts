import cors from 'cors'
import { ICorsMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class CorsMiddleware implements ICorsMiddleware {
    public bind: boolean = true
    public execute: ReturnType<typeof cors> = cors({
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200,
    })
}

