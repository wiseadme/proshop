import { Document, model, Schema } from 'mongoose'
import { ICategory, ICategoryMongoModel } from '@proshop/types'

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
        metatags: Array,
        schema: Array,
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
        visible: Boolean,
        special: Boolean,
    },
    length: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

export const CategoryModel = model<ICategoryMongoModel>('Category', CategorySchema)
