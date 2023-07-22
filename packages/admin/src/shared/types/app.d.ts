/// <reference types="vue/macros-global" />
import {
    IAttribute,
    ICategory,
    IUnit,
    IVariant
} from '@proshop/types'
import { AxiosResponse } from 'axios'

export interface IRest<T> {
  get: (url: string, ...args: any) => Promise<AxiosResponse<{ data: T[], ok: boolean }>>
  post: (url: string, ...args: any) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
  patch: (url: string, ...args: any) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
  delete: (url: string, ...args: any) => Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
}

export interface IRepository<T> {
  create: (...args: any[]) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
  read: (...args: any[]) => Promise<AxiosResponse<{ data: T[], ok: boolean }>>
  update: (...args: any[]) => Promise<AxiosResponse<{ data: T, ok: boolean }>>
  delete: (...args: any[]) => Promise<AxiosResponse<{ data: boolean, ok: boolean }>>
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
