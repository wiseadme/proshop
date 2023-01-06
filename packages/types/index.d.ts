import type { IAsset } from './asset'
import type { IAttribute } from './attribute'
import type { IUnit } from './unit'
import type { ICart, ICartItem, ICurrency } from './cart'
import type { ICategory, ICategoryConditions } from './category'
import type { ISEOType } from './common'
import type { IOption } from './option'
import type { IOrder, IOrderClient, IOrderStatuses } from './order'
import type { IProduct, IProductConditions } from './product'
import type { IVariant, IVariantOption } from './variant'
import type { IRequestPagination } from './request'
import type { IUser } from './user'
import type { Maybe } from './utils'

declare module '@ecommerce-platform/types' {
  export type {
    IAsset,
    IAttribute,
    IUnit,
    ICart,
    IUser,
    ICartItem,
    ICurrency,
    ICategory,
    ICategoryConditions,
    ISEOType,
    IOption,
    IOrder,
    IOrderClient,
    IOrderStatuses,
    IProduct,
    IProductConditions,
    IRequestPagination,
    IVariant,
    IVariantOption,
    Maybe
  }
}
