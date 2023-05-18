import express from 'express'
import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class UrlEncodedMiddleware implements IExpressMiddleware {
    public bind: boolean = true
    public execute: ReturnType<typeof express.urlencoded> = express.urlencoded({ extended: true })
}
