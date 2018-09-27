import { InterfaceException } from './InterfaceException'

export class GeneralException implements InterfaceException {
    private code: number
    private message: string
    private stack: string

    constructor(message: string, stack: string, code?: number) {
        this.message = message
        this.stack = stack
        this.code = code ? code : 1000
        this.catchError()
    }

    getErrorCode() {
        return this.code
    }

    getMessage() {
        return this.message
    }

    getStack() {
        return this.stack
    }

    catchError() {
        console.error(this.getErrorCode(), this.getMessage(), this.getStack())
    }
}