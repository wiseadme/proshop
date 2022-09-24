import { Maybe } from '@/types/types'

export interface IOption {
  name: string,
  price?: number,
  quantity?: number,
  description?: Maybe<string>,
  assets?: string[]
}
