import { ICart } from '@ecommerce-platform/types'

export class CartDTO {
  items: ICart['items']
  totalItems: ICart['totalItems']
  totalUniqueItems: ICart['totalUniqueItems']
  amount: ICart['amount']
  currency: ICart['currency']
  ownerId?: ICart['ownerId']
}
