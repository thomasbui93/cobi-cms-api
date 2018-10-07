import { Document, Schema, Model, model } from 'mongoose'
import { InterfaceCategory } from './InterfaceCategory'

export interface InterfaceModelCategory extends InterfaceCategory, Document {}

export const categorySchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})

categorySchema.pre('save', function(next: Function) {
    const now = new Date()
    if (!this.createdTime) {
      this.createdTime = now
    }
    this.updatedTime = now
    next()
}.bind(this))

categorySchema.index({
    title: 'text'
})


export const CategoryModel: Model<InterfaceModelCategory> = model('Category', categorySchema)