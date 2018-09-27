import { connect, connection } from 'mongoose'

import { InterfaceDatabase } from './InterfaceDatabase'

export class Mongo implements InterfaceDatabase {
    private connectionAddress: string

    constructor() {
        this.connectionAddress = process.env.MONGO_URL
    }

    start() {
        return connect(this.connectionAddress, { useNewUrlParser: true })
    }

    stop() {
        return connection.close()
    }

    isValid() {
        return connection.readyState === 1
    }
}