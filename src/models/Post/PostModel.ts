import { Schema, model, Model, Document } from 'mongoose'
import { InterfacePost } from './InterfacePost'

export interface InterfaceModelPost extends InterfacePost, Document {}

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String]
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'Category'
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

postSchema.pre('save', function(next: Function) {
    const now = new Date()
    if (!this.createdTime) {
      this.createdTime = now
    }
    this.updatedTime = now
    next()
}.bind(this))

export const PostModel: Model<InterfaceModelPost> = model('Post', postSchema)