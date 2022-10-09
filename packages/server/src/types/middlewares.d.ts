import express, { Errback, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import { initKeycloak } from '@common/plugins/keycloak'

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void
}

export interface IErrorRouteMiddleware {
  bind: boolean
  execute: (err: Errback, req: Request, res: Response, next: NextFunction) => void
}

export interface IExpressMiddleware {
  bind: boolean
  execute: ReturnType<typeof express.json>
}

export interface IKeycloakMiddleware {
  bind: boolean
  execute: ReturnType<typeof initKeycloak>
}

export interface ISessionMiddleware {
  bind: boolean
  execute: ReturnType<typeof session>
}

export interface IFileLoaderMiddleware {
  bind: boolean
  loadSingle: (fieldName: string) => any
  loadArray: (fieldName: string, count: number) => any
}
