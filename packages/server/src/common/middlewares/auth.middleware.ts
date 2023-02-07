import { IMiddleware } from '@/types/middlewares'
import { NextFunction, Request, Response } from 'express'
import { ClassConstructor, plainToClass } from 'class-transformer'

export class AuthMiddleware implements IMiddleware {
  public bind: boolean = true
  static classToValidate

  execute() {
    return ({ cookies }: Request, res: Response, next: NextFunction) => {
      const { auth } = cookies

      if (!auth) {

      }
    }
  }
}
