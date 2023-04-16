import { Document } from 'mongoose'
import { IMetaTag } from '@ecommerce-platform/types'

export interface IMetaTagService {
  create(metatag: IMetaTag): Promise<IMetaTag & Document>

  read(params: Partial<IMetaTag>): Promise<(IMetaTag & Document)[]>

  update(updates: Partial<IMetaTag>): Promise<{ updated: IMetaTag & Document }>

  delete(queryParams: Partial<IMetaTag>): Promise<boolean>
}
