import { InterfaceCategory } from '../Category/InterfaceCategory'

export interface InterfacePost {
    title: string,
    content: string,
    keywords?: Array<string>,
    categories: Array<string> | Array<InterfaceCategory>,
    createdTime: Date,
    updatedTime: Date
}