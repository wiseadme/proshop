import { model, Schema } from 'mongoose'
import { ICategoryMongoModel, IMetaTag } from '@proshop-app/types'

const CategorySchema: Schema = new Schema<ICategoryMongoModel>({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        unique: true,
    },
    image: String,
    assets: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Asset',
        }],
        default: [],
    },
    seo: {
        title: String,
        description: String,
        keywords: String,
        metatags: [] as IMetaTag[],
        schema: [] as any[],
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    filters: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'FilterGroup',
        }],
        default: []
    },
    order: {
        type: Number,
        default: 0,
    },
    conditions: {
        isMain: Boolean,
        isVisible: Boolean,
        isSpecial: Boolean,
        isSub: Boolean,
        isInNav: Boolean,
        isCatalog: Boolean,
        isTop: Boolean,
    },
    length: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

export const CategoryModel = model<ICategoryMongoModel>('Category', CategorySchema)
