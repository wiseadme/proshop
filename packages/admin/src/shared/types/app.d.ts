/// <reference types="vue/macros-global" />
import { AxiosResponse } from 'axios'

import {
    IAttribute,
    ICategory,
    IUnit,
    IVariant,
} from '@proshop/types'

export interface IRest<T = any>{
    get: (url: string, ...args: any) => Promise<AxiosResponse<{ data: any, ok: boolean }>>
    post: (url: string, ...args: any) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
    patch: (url: string, ...args: any) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
    delete: (url: string, ...args: any) => Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

export interface IRepository<T> {
    create: (args: T) => ReturnType<IRest<T>['post']>
    read: (...args: any[]) => ReturnType<IRest<T>['get']>
    update: (...args: any[]) => ReturnType<IRest<T>['patch']>
    delete: (...args: any[]) => ReturnType<IRest<T>['delete']>
}

export interface IItemsRepository<T> {
    create: (args: any) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
    read: (args: any) => Promise<AxiosResponse<{ data: { items: T[], total: number }, ok: boolean }>>
    update: (args: any[]) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
    delete: (id: string) => Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

declare type AppState = {
    attributes: Maybe<Array<IAttribute>>
    categories: Maybe<Array<ICategory>>
    variants: Maybe<Array<IVariant>>
    units: Maybe<Array<IUnit>>,
    progress: number
}

declare module '@proshop/type' {
    export const content: any
}
