/// <reference types="vue/macros-global" />
import { IVariant } from '@modules/variant/types'

export interface IRest {
  get: (url: string, ...args: any) => Promise<{ data: any }>
  post: (url: string, ...args: any) => Promise<{ data: any }>
  patch: (url: string, ...args: any) => Promise<{ data: any }>
  delete: (url: string, ...args: any) => Promise<{ data: any }>
}

export interface IRepository {
  create: (...args: any[]) => Promise<{ data: any }>
  read: (...args: any[]) => Promise<{ data: any }>
  update: (...args: any[]) => Promise<{ data: any }>
  delete: (...args: any[]) => Promise<{ data: any }>
}

declare type AppState = {
  attributes: Maybe<Array<IAttribute>>
  categories: Maybe<Array<ICategory>>
  variants: Maybe<Array<IVariant>>
  units: Maybe<Array<IUnit>>,
  progress: number
}

declare module '@ecommerce-platform/type' {
  export const content: any
}
