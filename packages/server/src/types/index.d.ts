import { NextFunction, Request, Response, Router } from 'express'

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export type SendOptions = {
    response: Response,
    request: Request
    data: any
}

export type ErrorOptions = {
    request: Request
    error: any
    status?: number
    next?: NextFunction
}

export interface IController {
    path: string
    router: Router
    initRoutes: () => void
}

export interface IConfig {
    port: number
    dbUri: string
    accessSecret: string
    refreshSecret: string
    uploadsDir: string
    websiteUrl: string
    telegramBotUrl: string
    redisHost: string
    redisPort: string
    redisUrl: string
}

export interface IDb {
    connect: () => any
    onConnect: () => void
    onError: () => void
    onClose: () => void
}

export interface IRedis {
    client: any
    connect: () => any
    onConnect: () => void
    onError: () => void
    onClose: () => void
    onReady: () => void
}
