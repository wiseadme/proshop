import { IMetaTag } from '@proshop/types'
import { Document } from 'mongoose'
import { id } from 'inversify'

export interface IMetaTagRepository {
    create(metaTag: IMetaTag): Promise<IMetaTag>

    read(params: Partial<IMetaTag>): Promise<IMetaTag[]>

    update(updates: Partial<IMetaTag>): Promise<IMetaTag>

    delete(id: string): Promise<boolean>
}
