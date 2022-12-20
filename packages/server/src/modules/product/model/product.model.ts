import { model, Schema } from 'mongoose'
import { IProduct } from '@ecommerce-platform/types'

const ProductSchema = new Schema<IProduct>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  unit: {
    type: {
      value: String,
      meta: String
    },
    default: null
  },
  url: {
    type: String,
    unique: true
  },
  categories: {
    type: [ {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    } ],
    required: true
  },
  image: {
    type: String,
    default: null
  },
  seo: {
    type: {
      title: String,
      description: String,
      keywords: String
    },
  },
  attributes: {
    type: [ {
      meta: String,
      key: String,
      value: String,
      order: Number,
      _id: false,
    } ],
    default: []
  },
  assets: {
    type: [ {
      type: Schema.Types.ObjectId,
      ref: 'Asset'
    } ],
    default: []
  },
  variants: {
    type: [
      {
        group: String,
        options: [ {
          type: Schema.Types.ObjectId,
          ref: 'Option'
        } ]
      }
    ],
    default: []
  },
  conditions: {
    type: {
      visible: Boolean,
      countable: Boolean,
      exists: Boolean,
      hasDiscounts: Boolean,
      hasActions: Boolean,
    }
  },
}, {
  timestamps: true
})

export const ProductModel = model('Product', ProductSchema)
