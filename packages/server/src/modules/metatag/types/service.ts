import { Document } from 'mongoose'
import { IMetaTag } from '@proshop/types'

export interface IMetaTagService {
    create(metatag: IMetaTag): Promise<IMetaTag>

    read(params: Partial<IMetaTag>): Promise<IMetaTag[]>

    update(updates: Partial<IMetaTag>): Promise<IMetaTag>

    delete(id: string): Promise<boolean>
}
