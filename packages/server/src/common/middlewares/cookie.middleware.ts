import cookieParser from 'cookie-parser'
import { ICookieMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class CookieMiddleware implements ICookieMiddleware {
  public bind: boolean = true
  public execute: ReturnType<typeof cookieParser> = cookieParser()
}

