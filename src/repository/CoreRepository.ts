import { Model, Document } from 'mongoose'

import { InterfaceCRUD } from './InterfaceCRUD'
import { GeneralException } from '../exception/GeneralException'
import { InterfaceQuery } from './InterfaceQuery'

export class CoreRepository implements InterfaceCRUD<Document> {
    private model: Model<Document>

    constructor(model: Model<Document>) {
        this.model = model
    }

    async create(item: any) {
        try {
            const category = await this.model.create(item)
            return category
        } catch (error) {
            throw new GeneralException('Error while creating document', error.stack, 1000)
        }
    }

    async read(id: string) {
        try {
            const category = await this.model.findById(id)
            return category
        } catch (error) {
            throw new GeneralException('Error while reading document', error.stack, 1000)
        }
    }

    async update(id: string, item: any) {
        try {
            const category = await this.model.findOneAndUpdate(id, item)
            return category
        } catch (error) {
            throw new GeneralException('Error while updating document', error.stack, 1000)
        }
    }

    async remove(id: string) {
        try {
            const category = await this.model.findByIdAndRemove(id)
            return category
        } catch (error) {
            throw new GeneralException('Error while removing document', error.stack, 1000)
        }
    }

    async retrieve(query: InterfaceQuery) {
        const { limit, skip } = this.formulatePagination(query)
        return this.model.find({}, this.getSortField(query))
            .limit(limit)
            .skip(skip)
    }

    async search(queryString: string, query: InterfaceQuery) {
        const { limit, skip } = this.formulatePagination(query)
        return this.model.find({
            $text: { $search: queryString }
        }, this.getSortField(query))
            .limit(limit)
            .skip(skip)
    }

    formulatePagination(query: InterfaceQuery) {
        const { page, size } = query
        try {
            const limit = size
            const skip = (page - 1) * size
            return {
                limit,
                skip
            }
        } catch (error) {
            return {
                limit: size,
                skip: 0
            }
        }
    }

    getSortField(query: InterfaceQuery) {
        const { sortField } = query
        const sort: any = {}
        sort[sortField.toString()] = -1
        return sort
    }
}