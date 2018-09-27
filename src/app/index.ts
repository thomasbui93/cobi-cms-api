import { config } from 'dotenv'
import 'reflect-metadata'
import { Express, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { NextFunction } from 'express-serve-static-core'

import { InterfaceDatabase } from '../database/InterfaceDatabase'
import { GeneralException } from '../exception/GeneralException'
import { Mongo } from '../database/Mongo'

import '../controllers'

export class Application {
    private rootDatabase: InterfaceDatabase

    constructor() {
        this.bootstrap()
        this.run()
        this.setupApp()
    }

    bootstrap() {
        config()
        this.rootDatabase = new Mongo()
    }

    setupApp() {
        const container = new Container()
        const server = new InversifyExpressServer(container)
        server.setConfig(this.registerMiddlewares)
            .setErrorConfig(this.registerFailSafe)
            .build()
            .listen(process.env.PORT || 8080)
    }

    registerMiddlewares(app: Express) {
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(bodyParser.json())
    }

    registerFailSafe(app: Express) {
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(500).send('Internal error, please try again')
        })
    }

    async run() {
        await this.startupCheck()
    }

    async startupCheck() {
        try {
            await this.connectToDatabase()
        } catch (error) {
            throw new GeneralException('Error while starting up application', error.stack, 1000)
        }
    }

    async connectToDatabase() {
        try {
            await this.rootDatabase.start()
        } catch (error) {
            throw new GeneralException('Error while connect to database', error.stack, 1000)
        }
    }
}