export interface IMetaTag {
    id: string
    props: Record<string, string>
    order: number
}

export interface IMetaTagMongoModel extends Omit<IMetaTag, 'id'> {
    _id: string
}
