import express, { Errback, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'

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

export interface ICookieMiddleware {
  bind: boolean
  execute: ReturnType<typeof cookieParser>
}

export interface ICorsMiddleware {
  bind: boolean
  execute: ReturnType<typeof cors>
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
