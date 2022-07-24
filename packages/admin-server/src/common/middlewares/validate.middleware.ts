import { IMiddleware } from '@/types/middlewares'
import { NextFunction, Request, Response } from 'express'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

export class ValidateMiddleware implements IMiddleware {
  static classToValidate

  constructor(classToValidate: ClassConstructor<object>) {
    ValidateMiddleware.classToValidate = classToValidate
  }

  execute({ body }: Request, res: Response, next: NextFunction) {
    const instance = plainToClass(ValidateMiddleware.classToValidate, body)

    validate(instance).then(errors => {
      if (errors.length > 0) {
        res.status(422).json({
          ok: false,
          errors
        })
      } else {
        next()
      }
    })
  }
}
