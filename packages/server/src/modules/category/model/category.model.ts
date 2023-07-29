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
    seo: {
        title: String,
        description: String,
        keywords: String,
        metatags: Array,
        schema: Array,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    order: {
        type: Number,
        default: 0,
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
        _id: false,
    }],
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
