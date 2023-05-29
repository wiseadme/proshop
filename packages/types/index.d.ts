import type { IAsset } from './asset'
import type { IAttribute } from './attribute'
import type { IUnit } from './unit'
import type { ICart, ICartItem, ICurrency } from './cart'
import type { ICategory, ICategoryConditions } from './category'
import type { ISEOType } from './common'
import type { IOption } from './option'
import type { IOrder, IOrderCustomer, IOrderStatuses } from './order'
import type { IProduct, IProductConditions } from './product'
import type { IVariant, IVariantOption } from './variant'
import type { IRequestPagination } from './request'
import type { IUser } from './user'
import type { Maybe } from './utils'
import type { IMetaTag } from './metatag'

declare module '@proshop/types' {
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
    IOrderCustomer,
    IOrderStatuses,
    IProduct,
    IProductConditions,
    IRequestPagination,
    IVariant,
    IVariantOption,
    IMetaTag,
    Maybe
  }
}
