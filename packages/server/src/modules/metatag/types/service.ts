import { IMetaTag } from '@proshop-app/types'

export interface IMetaTagService {
    create(metatag: IMetaTag): Promise<IMetaTag>

    read(params: Partial<IMetaTag>): Promise<IMetaTag[]>

    update(updates: Partial<IMetaTag>): Promise<IMetaTag>

    delete(id: string): Promise<boolean>
}
