import { Response, Router } from 'express'

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export type SendOptions = {
    response: Response,
    method: string
    data: any
    url: string
}

export type ErrorOptions = {
    method: string
    error: any
    url: string
}

export interface IController {
    path: string
    router: Router
    middlewares?: any
    initRoutes: () => void
}

export interface IConfig {
    port: number
    dbUri: string
    accessSecret: string
    refreshSecret: string
    uploadsDir: string
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
