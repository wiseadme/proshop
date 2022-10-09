import express from 'express'
import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class JsonMiddleware implements IExpressMiddleware {
  public bind: boolean = true
  public execute: ReturnType<typeof express.json> = express.json({})
}
