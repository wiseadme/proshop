import { IMetaTag } from '@proshop/types'
import { Document } from 'mongoose'

export interface IMetaTagRepository {
    create(metaTag: IMetaTag): Promise<IMetaTag & Document>

    read(params: Partial<IMetaTag>): Promise<(IMetaTag & Document)[]>

    update(updates: Partial<IMetaTag>): Promise<{ updated: IMetaTag & Document }>

    delete(id: string): Promise<boolean>
}
