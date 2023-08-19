import { model, Schema } from 'mongoose'
import { IProductMongoModel } from '@proshop/types'

const ProductSchema = new Schema<IProductMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        index: true,
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        default: null,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    unit: {
        type: {
            value: String,
            meta: String,
        },
        default: null,
    },
    url: {
        type: String,
        unique: true,
        index: true
    },
    categories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }],
        required: true,
        index: true,
    },
    image: {
        type: String,
        default: null,
    },
    seo: {
        title: String,
        description: String,
        keywords: String,
        metatags: Array,
        schema: Array,
    },
    attributes: {
        type: [{
            meta: String,
            key: String,
            value: String,
            order: Number,
            id: String,
            _id: false,
        }],
        default: [],
    },
    assets: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Asset',
        }],
        default: [],
    },
    variants: {
        type: [
            {
                group: String,
                attributeId: String,
                _id: String,
                options: [{
                    type: Schema.Types.ObjectId,
                    ref: 'Option',
                }],
            },
        ],
        default: [],
    },
    conditions: {
        type: {
            visible: Boolean,
            countable: Boolean,
            exists: Boolean,
            hasDiscounts: Boolean,
            hasActions: Boolean,
        },
    },
    related: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        default: [],
    },
}, {
    timestamps: true,
})

export const ProductModel = model('Product', ProductSchema)
