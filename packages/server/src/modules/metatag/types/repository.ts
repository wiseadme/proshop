import { IMetaTag } from '@proshop/types'
import { Document } from 'mongoose'

export interface IMetaTagRepository {
    create(metaTag: IMetaTag): Promise<IMetaTag>

    read(params: Partial<IMetaTag>): Promise<IMetaTag[]>

    update(updates: Partial<IMetaTag>): Promise<{ updated: IMetaTag }>

    delete(id: string): Promise<boolean>
}
